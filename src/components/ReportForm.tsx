"use client";

import { useMemo, useState } from "react";
import { z } from "zod";

const schema = z.object({
  category: z.enum(["use", "deal", "pressure", "other"]),
  description: z.string().min(20, "Mô tả tối thiểu 20 ký tự."),
  area: z.string().optional(),
  schoolName: z.string().optional(),
});

const categories = [
  { value: "use", label: "Sử dụng" },
  { value: "deal", label: "Mua bán" },
  { value: "pressure", label: "Rủ rê" },
  { value: "other", label: "Khác" },
];

const provinces = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Bình Dương",
  "Nghệ An",
  "Khác",
];

export default function ReportForm({ schoolCode }: { schoolCode?: string }) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [loading, setLoading] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const remaining = useMemo(() => 20 - description.length, [description]);

  const submit = async () => {
    setError(null);
    const parsed = schema.safeParse({
      category,
      description,
      area: area || undefined,
      schoolName: schoolName || undefined,
    });

    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? "Thông tin chưa hợp lệ.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, schoolCode }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message ?? "Gửi tố giác thất bại.");
      }
      setRefCode(data.refCode);
      setDescription("");
      setCategory("");
      setArea("");
      setSchoolName("");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Không thể gửi tố giác. Vui lòng thử lại.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="card">
        <h2 className="font-display text-2xl font-bold text-blue-deep">
          Gửi tố giác ẩn danh
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Không yêu cầu thông tin cá nhân. Mọi dữ liệu được bảo mật.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {categories.map((item) => (
            <button
              key={item.value}
              className={`rounded-2xl border p-4 text-left transition ${
                category === item.value
                  ? "border-red-alert bg-red-50 text-red-alert"
                  : "border-gray-100 text-gray-400"
              }`}
              onClick={() => setCategory(item.value)}
            >
              <p className="text-sm font-semibold">{item.label}</p>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <label className="text-sm font-semibold text-gray-800">
            Mô tả sự việc
          </label>
          <textarea
            className={`mt-2 min-h-[150px] w-full rounded-2xl border-2 px-4 py-3 focus:outline-none ${
              description.length < 20 ? "border-red-200" : "border-gray-200"
            }`}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <p
            className={`mt-2 text-xs ${
              remaining > 0 ? "text-red-alert" : "text-green-safe"
            }`}
          >
            {remaining > 0
              ? `Cần thêm ${remaining} ký tự`
              : "Đã đạt yêu cầu tối thiểu"}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-gray-800">Khu vực</label>
            <select
              className="input mt-2"
              value={area}
              onChange={(event) => setArea(event.target.value)}
            >
              <option value="">Chọn tỉnh/thành</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-800">Tên trường</label>
            <input
              className="input mt-2"
              placeholder="Ví dụ: THPT ABC"
              value={schoolName}
              onChange={(event) => setSchoolName(event.target.value)}
            />
          </div>
        </div>

        {error ? (
          <p className="mt-4 text-sm font-semibold text-red-alert">{error}</p>
        ) : null}

        <button
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#C53030] to-[#7B2020] px-6 py-3 font-bold text-white transition hover:opacity-90"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Đang gửi..." : "Gửi tố giác"}
        </button>

        {refCode ? (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-safe">
              Tố giác đã được ghi nhận.
            </p>
            <p className="mt-1 text-sm text-gray-800">
              Mã tham chiếu: <span className="font-mono font-bold">{refCode}</span>
            </p>
            <p className="text-xs text-gray-400">
              Vui lòng lưu mã này để theo dõi trạng thái.
            </p>
          </div>
        ) : null}
      </div>

      <aside className="h-fit space-y-6 lg:sticky lg:top-24">
        <div className="rounded-2xl bg-red-alert p-6 text-white">
          <p className="text-sm font-semibold">Hotline hỗ trợ khẩn cấp</p>
          <p className="mt-2 text-2xl font-bold">1800 1234</p>
          <p className="text-xs text-red-100">24/7 · Miễn phí cuộc gọi</p>
        </div>
        <div className="card space-y-3">
          <p className="font-semibold text-blue-deep">Quy trình xử lý</p>
          {[
            "Tiếp nhận thông tin ẩn danh",
            "Sàng lọc và xác minh ban đầu",
            "Phối hợp nhà trường xử lý",
            "Chuyển tuyến cơ quan chức năng",
            "Phản hồi kết quả",
          ].map((step, index) => (
            <div key={step} className="flex gap-3 text-sm text-gray-400">
              <span className="font-semibold text-blue-mid">{index + 1}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
        <div className="card text-sm text-gray-400">
          SafeZone cam kết bảo mật tuyệt đối, không lưu thông tin định danh.
        </div>
      </aside>
    </div>
  );
}
