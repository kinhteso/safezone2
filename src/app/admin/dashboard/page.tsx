import TrafficChart from "../../../components/Dashboard/TrafficChart";
import ReportDonut from "../../../components/Dashboard/ReportDonut";
import ReportTable from "../../../components/Dashboard/ReportTable";
import KPICard from "../../../components/Dashboard/KPICard";

type DashboardResponse = {
  kpis: {
    pageViews: number;
    chatSessions: number;
    reportsCount: number;
    articlesRead: number;
    changes: {
      pageViews: number;
      chatSessions: number;
      reportsCount: number;
      articlesRead: number;
    };
  };
  traffic: Array<{ date: string; visits: number; chats: number }>;
  donut: Array<{ name: string; value: number; color: string }>;
  reports: Array<any>;
};

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams?: { days?: string };
}) {
  const days = searchParams?.days ?? "30";
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const demoData: DashboardResponse = {
    kpis: {
      pageViews: 12840,
      chatSessions: 2420,
      reportsCount: 312,
      articlesRead: 5400,
      changes: {
        pageViews: 18,
        chatSessions: 12,
        reportsCount: -4,
        articlesRead: 22,
      },
    },
    traffic: Array.from({ length: 12 }).map((_, index) => ({
      date: `D-${12 - index}`,
      visits: 600 + index * 80,
      chats: 120 + index * 25,
    })),
    donut: [
      { name: "use", value: 120, color: "#1B6CA8" },
      { name: "deal", value: 78, color: "#E53E3E" },
      { name: "pressure", value: 64, color: "#F6A623" },
      { name: "other", value: 50, color: "#8BA0B8" },
    ],
    reports: [
      {
        id: "demo-1",
        ref_code: "#SZ-2026-021",
        category: "use",
        area: "Hà Nội",
        status: "pending",
        created_at: new Date().toISOString(),
      },
      {
        id: "demo-2",
        ref_code: "#SZ-2026-020",
        category: "deal",
        area: "TP. Hồ Chí Minh",
        status: "reviewed",
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "demo-3",
        ref_code: "#SZ-2026-019",
        category: "pressure",
        area: "Đà Nẵng",
        status: "forwarded",
        created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
    ],
  };

  let data = demoData;
  try {
    const response = await fetch(
      `${baseUrl}/api/admin/stats?days=${days}`,
      { cache: "no-store" }
    );
    if (response.ok) {
      data = (await response.json()) as DashboardResponse;
    }
  } catch {
    data = demoData;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-400">
            Dashboard thống kê
          </p>
          <h1 className="font-display text-3xl font-bold text-blue-deep">
            Tổng quan SafeZone
          </h1>
        </div>
        <div className="flex gap-2">
          {[7, 30, 90].map((value) => (
            <a
              key={value}
              href={`?days=${value}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                Number(days) === value
                  ? "bg-blue-mid text-white"
                  : "border border-gray-100 text-gray-400"
              }`}
            >
              {value} ngày
            </a>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          label="Lượt truy cập"
          value={data.kpis.pageViews}
          change={data.kpis.changes.pageViews}
        />
        <KPICard
          label="Phiên chat"
          value={data.kpis.chatSessions}
          change={data.kpis.changes.chatSessions}
        />
        <KPICard
          label="Tố giác ẩn danh"
          value={data.kpis.reportsCount}
          change={data.kpis.changes.reportsCount}
        />
        <KPICard
          label="Bài viết đã đọc"
          value={data.kpis.articlesRead}
          change={data.kpis.changes.articlesRead}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <TrafficChart data={data.traffic} />
        <ReportDonut data={data.donut} />
      </div>

      <ReportTable reports={data.reports} />
    </div>
  );
}
