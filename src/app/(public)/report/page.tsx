import ReportForm from "../../../components/ReportForm";

export default function ReportPage({
  searchParams,
}: {
  searchParams?: { school?: string };
}) {
  return (
    <section className="container-safe py-12">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase text-blue-mid">
          Tố giác ẩn danh
        </p>
        <h1 className="reveal font-display text-3xl font-bold text-blue-deep md:text-4xl">
          Gửi phản ánh an toàn
        </h1>
        <p className="reveal reveal-delay-1 text-sm text-gray-400 md:text-base">
          Không yêu cầu đăng nhập, không lưu thông tin cá nhân.
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <ReportForm schoolCode={searchParams?.school} />
      </div>
    </section>
  );
}
