import { NextResponse } from "next/server";
import { createAdminClient } from "../../../../lib/supabase/admin";
import { createServerClient } from "../../../../lib/supabase/server";

const CATEGORY_COLORS: Record<string, string> = {
  use: "#1B6CA8",
  deal: "#E53E3E",
  pressure: "#F6A623",
  other: "#8BA0B8",
};

export async function GET(request: Request) {
  try {
    const supabaseAuth = await createServerClient();
    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = Number(searchParams.get("days") ?? "30");
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - days);

    const prevStart = new Date(start);
    prevStart.setDate(start.getDate() - days);

    const supabase = createAdminClient();

    const { data: currentStats } = await supabase
      .from("daily_stats")
      .select("*")
      .gte("date", start.toISOString().slice(0, 10));

    const { data: prevStats } = await supabase
      .from("daily_stats")
      .select("*")
      .gte("date", prevStart.toISOString().slice(0, 10))
      .lt("date", start.toISOString().slice(0, 10));

    const sumStats = (items: any[] = []) =>
      items.reduce(
        (acc, item) => {
          acc.pageViews += item.page_views ?? 0;
          acc.chatSessions += item.chat_sessions ?? 0;
          acc.reportsCount += item.reports_count ?? 0;
          acc.articlesRead += item.articles_read ?? 0;
          return acc;
        },
        {
          pageViews: 0,
          chatSessions: 0,
          reportsCount: 0,
          articlesRead: 0,
        }
      );

    const currentSum = sumStats(currentStats);
    const prevSum = sumStats(prevStats);

    const percent = (current: number, previous: number) =>
      previous === 0 ? 100 : Math.round(((current - previous) / previous) * 100);

    const { data: reports } = await supabase
      .from("reports")
      .select("id, category, created_at, status, area, ref_code")
      .order("created_at", { ascending: false })
      .limit(10);

    const { data: donutRaw } = await supabase
      .from("reports")
      .select("category")
      .gte("created_at", start.toISOString());

    const donutMap = (donutRaw ?? []).reduce<Record<string, number>>(
      (acc, item) => {
        acc[item.category] = (acc[item.category] ?? 0) + 1;
        return acc;
      },
      {}
    );

    const donut = Object.entries(donutMap).map(([name, value]) => ({
      name,
      value,
      color: CATEGORY_COLORS[name] ?? "#1B6CA8",
    }));

    const traffic =
      currentStats?.map((item) => ({
        date: item.date,
        visits: item.page_views ?? 0,
        chats: item.chat_sessions ?? 0,
      })) ?? [];

    return NextResponse.json({
      kpis: {
        pageViews: currentSum.pageViews,
        chatSessions: currentSum.chatSessions,
        reportsCount: currentSum.reportsCount,
        articlesRead: currentSum.articlesRead,
        changes: {
          pageViews: percent(currentSum.pageViews, prevSum.pageViews),
          chatSessions: percent(currentSum.chatSessions, prevSum.chatSessions),
          reportsCount: percent(currentSum.reportsCount, prevSum.reportsCount),
          articlesRead: percent(currentSum.articlesRead, prevSum.articlesRead),
        },
      },
      traffic,
      donut,
      reports: reports ?? [],
    });
  } catch (error) {
    return NextResponse.json({ message: "Có lỗi xảy ra." }, { status: 500 });
  }
}
