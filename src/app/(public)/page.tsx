import Link from "next/link";
import Reveal from "../../components/ui/Reveal";

const features = [
  {
    title: "CMS nội dung",
    description: "Quản lý bài viết, video, tài liệu theo chủ đề.",
  },
  {
    title: "SafeBot AI",
    description: "Chatbot FAQ ẩn danh 24/7, hỗ trợ học sinh.",
  },
  {
    title: "Tố giác ẩn danh",
    description: "Gửi phản ánh bảo mật, không cần đăng nhập.",
  },
  {
    title: "Dashboard",
    description: "Thống kê trực quan cho admin từng trường.",
  },
];

const comingSoon = [
  { title: "Gamification", description: "Thử thách nâng cao nhận thức." },
  { title: "Risk Map", description: "Bản đồ rủi ro theo khu vực." },
];

export default function HomePage() {
  return (
    <div>
      <section className="hero-glow">
        <div className="container-safe grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <Reveal className="text-sm font-semibold uppercase tracking-widest text-blue-mid">
              SafeZone · Phase 1 MVP
            </Reveal>
            <Reveal
              delay={80}
              className="font-display text-4xl font-extrabold text-blue-deep md:text-5xl"
            >
              Vùng an toàn số cho thế hệ trẻ Việt Nam
            </Reveal>
            <Reveal delay={160} className="text-lg text-gray-400">
              Nền tảng phòng chống ma túy học đường kết nối nhà trường, y tế,
              công an và cộng đồng.
            </Reveal>
            <Reveal delay={240} className="flex flex-wrap gap-4">
              <Link href="/chatbot" className="btn-primary">
                Tư vấn ẩn danh
              </Link>
              <Link href="/report" className="btn-danger">
                Tố giác ngay
              </Link>
            </Reveal>
          </div>
          <Reveal delay={160} className="glass-panel p-8">
            <p className="text-sm text-gray-400">Tác động dự kiến</p>
            <div className="mt-6 grid grid-cols-2 gap-6">
              {[
                { label: "Trường pilot", value: "05" },
                { label: "Phiên chat/tháng", value: "2.000+" },
                { label: "Bài viết CMS", value: "120+" },
                { label: "Tố giác ẩn danh", value: "300+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-blue-deep">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-safe py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal className="space-y-3">
            <p className="text-sm font-semibold uppercase text-blue-mid">
              Tính năng Phase 1
            </p>
            <h2 className="font-display text-3xl font-bold text-blue-deep">
              Bốn mảnh ghép cốt lõi
            </h2>
            <p className="text-gray-400">
              Tập trung vào demo khả thi, chi phí thấp, triển khai nhanh.
            </p>
          </Reveal>
          <div className="lg:col-span-2 grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={(index + 1) * 80}>
                <div className="card">
                  <h3 className="font-semibold text-blue-deep">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
            {comingSoon.map((feature, index) => (
              <Reveal key={feature.title} delay={(index + 3) * 80}>
                <div className="card border-dashed border-blue-100">
                  <p className="text-xs font-semibold uppercase text-blue-mid">
                    Sắp ra mắt
                  </p>
                  <h3 className="mt-2 font-semibold text-blue-deep">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-deep py-12 text-white">
        <div className="container-safe grid gap-6 md:grid-cols-3">
          <Reveal>
            <p className="text-sm uppercase text-blue-pale">Thống kê quốc gia</p>
            <p className="mt-2 font-display text-3xl font-bold">
              70% người nghiện lần đầu tiếp xúc trong độ tuổi 15-24
            </p>
          </Reveal>
          <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
            {[
              "Tăng cường giáo dục phòng chống ma túy trong trường học.",
              "Ưu tiên giải pháp ẩn danh để khuyến khích tố giác.",
              "Kết nối nhanh giữa nhà trường và cơ quan chức năng.",
              "Cập nhật dữ liệu theo thời gian thực để phản ứng kịp thời.",
            ].map((item, index) => (
              <Reveal key={item} delay={(index + 1) * 80}>
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-blue-pale">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-safe py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <p className="text-sm font-semibold uppercase text-blue-mid">
              Đối tác đồng hành
            </p>
            <h2 className="font-display text-3xl font-bold text-blue-deep">
              Cùng tạo nên vùng an toàn
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {["Trường học", "Bệnh viện", "Công an", "Cai nghiện", "Cộng đồng"].map(
              (partner, index) => (
                <Reveal key={partner} delay={(index + 1) * 80}>
                  <div className="flex items-center justify-center rounded-2xl border border-gray-100 bg-white px-4 py-6 text-sm font-semibold text-gray-400 shadow-sm">
                    {partner}
                  </div>
                </Reveal>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
