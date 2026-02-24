import { createAdminClient } from "../../../lib/supabase/admin";
import type { Report } from "../../../types";
import { formatDate } from "../../../lib/utils";

const statusOptions = ["pending", "reviewed", "forwarded", "closed"];

export default async function AdminReportsPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const status = searchParams?.status;
  const supabase = createAdminClient();
  let query = supabase.from("reports").select("*").order("created_at", {
    ascending: false,
  });
  if (status) {
    query = query.eq("status", status);
  }
  const { data } = await query;
  const reports = (data ?? []) as Report[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-blue-deep">
            Tố giác ẩn danh
          </h1>
          <p className="text-sm text-gray-400">
            Theo dõi và xử lý tố giác theo trạng thái.
          </p>
        </div>
        <div className="flex gap-2">
          {statusOptions.map((value) => (
            <a
              key={value}
              href={`?status=${value}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                status === value
                  ? "bg-blue-mid text-white"
                  : "border border-gray-100 text-gray-400"
              }`}
            >
              {value}
            </a>
          ))}
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="py-2">Mã</th>
              <th className="py-2">Loại</th>
              <th className="py-2">Khu vực</th>
              <th className="py-2">Thời gian</th>
              <th className="py-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t border-gray-100">
                <td className="py-3 font-mono">{report.ref_code}</td>
                <td className="py-3">{report.category}</td>
                <td className="py-3">{report.area ?? "-"}</td>
                <td className="py-3">{formatDate(report.created_at)}</td>
                <td className="py-3">{report.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
