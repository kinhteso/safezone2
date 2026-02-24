import Chatbot from "../../../components/Chatbot";

export default function ChatbotPage() {
  return (
    <section className="container-safe py-12">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase text-blue-mid">
          SafeBot AI
        </p>
        <h1 className="reveal font-display text-3xl font-bold text-blue-deep md:text-4xl">
          Tư vấn ẩn danh 24/7
        </h1>
        <p className="reveal reveal-delay-1 text-sm text-gray-400 md:text-base">
          SafeBot lắng nghe, hỗ trợ và cung cấp thông tin khoa học về phòng
          chống ma túy.
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <Chatbot />
      </div>
    </section>
  );
}
