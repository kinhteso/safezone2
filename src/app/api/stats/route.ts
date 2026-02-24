import { NextResponse } from "next/server";
import { createAdminClient } from "../../../lib/supabase/admin";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: stats } = await supabase
      .from("daily_stats")
      .select("*")
      .order("date", { ascending: false })
      .limit(30);

    const totals = (stats ?? []).reduce(
      (acc, item) => {
        acc.pageViews += item.page_views ?? 0;
        acc.chatSessions += item.chat_sessions ?? 0;
        acc.reportsCount += item.reports_count ?? 0;
        return acc;
      },
      { pageViews: 0, chatSessions: 0, reportsCount: 0 }
    );

    return NextResponse.json({ totals, stats: stats ?? [] });
  } catch (error) {
    return NextResponse.json({ message: "Có lỗi xảy ra." }, { status: 500 });
  }
}
