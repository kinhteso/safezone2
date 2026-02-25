import { NextResponse } from "next/server";
import { createAdminClient } from "../../../../lib/supabase/admin";
import { createServerClient } from "../../../../lib/supabase/server";
import {
  isMissingReportsTableError,
  readDemoReports,
} from "../../../../lib/demoReportsStore";

const CATEGORY_COLORS: Record<string, string> = {
  use: "#1B6CA8",
  deal: "#E53E3E",
  pressure: "#F6A623",
  other: "#8BA0B8",
};

export async function GET(request: Request) {
  try {
    const isDemoMode = process.env.ADMIN_DEMO_MODE === "true";
    if (!isDemoMode) {
      const supabaseAuth = await createServerClient();
      const {
        data: { user },
      } = await supabaseAuth.auth.getUser();
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
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

    const currentSum = sumStats(currentStats ?? undefined);
    const prevSum = sumStats(prevStats ?? undefined);

    const percent = (current: number, previous: number) =>
      previous === 0 ? 100 : Math.round(((current - previous) / previous) * 100);

    const reportsRes = await supabase
      .from("reports")
      .select("id, category, created_at, status, area, ref_code")
      .order("created_at", { ascending: false })
      .limit(10);

    const donutRes = await supabase
      .from("reports")
      .select("category")
      .gte("created_at", start.toISOString());
    let reports = reportsRes.data ?? [];
    let donutRaw = donutRes.data ?? [];

    const tableMissing =
      isDemoMode &&
      (isMissingReportsTableError(reportsRes.error?.message) ||
        isMissingReportsTableError(donutRes.error?.message));

    if (tableMissing) {
      const demoReports = await readDemoReports();
      reports = demoReports.slice(0, 10);
      donutRaw = demoReports
        .filter((item) => new Date(item.created_at) >= start)
        .map((item) => ({ category: item.category }));
    } else if (reportsRes.error || donutRes.error) {
      throw reportsRes.error ?? donutRes.error;
    }

    const reportsInRangeCount = donutRaw.length;

    const donutMap = donutRaw.reduce<Record<string, number>>(
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
        // Use live reports for instant feedback when users submit test reports.
        reportsCount: reportsInRangeCount,
        articlesRead: currentSum.articlesRead,
        changes: {
          pageViews: percent(currentSum.pageViews, prevSum.pageViews),
          chatSessions: percent(currentSum.chatSessions, prevSum.chatSessions),
          reportsCount: percent(reportsInRangeCount, prevSum.reportsCount),
          articlesRead: percent(currentSum.articlesRead, prevSum.articlesRead),
        },
      },
      traffic,
      donut,
      reports,
    });
  } catch {
    return NextResponse.json({ message: "Internal error." }, { status: 500 });
  }
}
