import type { Report } from "../../types";
import { formatDate } from "../../lib/utils";

const statusStyles: Record<Report["status"], string> = {
  pending: "bg-yellow-50 text-yellow-700",
  reviewed: "bg-blue-50 text-blue-700",
  forwarded: "bg-green-50 text-green-700",
  closed: "bg-gray-100 text-gray-600",
};

export default function ReportTable({ reports }: { reports: Report[] }) {
  return (
    <div className="card overflow-x-auto">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-blue-deep">Tố giác gần nhất</h3>
        <button className="rounded-lg border border-gray-100 px-3 py-2 text-sm font-semibold text-gray-400">
          Xuất CSV
        </button>
      </div>
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
              <td className="py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[report.status]}`}
                >
                  {report.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
