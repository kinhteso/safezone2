"use client";

import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Message = { role: "user" | "assistant"; content: string };

const FAQS = [
  "Dấu hiệu nhận biết người nghiện là gì?",
  "Học sinh nên làm gì khi bị rủ rê?",
  "Ma túy học đường thường xuất hiện ở đâu?",
  "Làm sao để hỗ trợ bạn bè gặp vấn đề?",
];

const QUICK_REPLIES = [
  "Em cần lời khuyên để nói chuyện với bạn.",
  "Có hotline hỗ trợ khẩn cấp không?",
  "Làm sao để nói với thầy cô?",
];

const MAX_MESSAGES = 20;

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Chào bạn! Mình là SafeBot. Bạn đang cần chia sẻ điều gì? Mình luôn lắng nghe ẩn danh và không phán xét.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  const [msgCount, setMsgCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("safezone_session");
    if (stored) {
      const parsed = JSON.parse(stored) as { token: string; createdAt: number };
      if (Date.now() - parsed.createdAt < 24 * 60 * 60 * 1000) {
        setSessionToken(parsed.token);
        return;
      }
    }
    const token = uuidv4();
    localStorage.setItem(
      "safezone_session",
      JSON.stringify({ token, createdAt: Date.now() })
    );
    setSessionToken(token);
  }, []);

  const remaining = useMemo(() => MAX_MESSAGES - msgCount, [msgCount]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || remaining <= 0) return;
    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionToken }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message ?? "Có lỗi xảy ra.");
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
      setMsgCount(data.msgCount);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Xin lỗi, hiện SafeBot đang gặp sự cố. Bạn có thể thử lại sau.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="card space-y-4 lg:sticky lg:top-24 h-fit">
        <p className="text-sm font-semibold text-blue-deep">FAQ gợi ý</p>
        <div className="space-y-2">
          {FAQS.map((faq) => (
            <button
              key={faq}
              className="w-full rounded-xl border border-gray-100 px-3 py-2 text-left text-sm text-gray-400 hover:border-blue-light hover:text-blue-deep"
              onClick={() => sendMessage(faq)}
            >
              {faq}
            </button>
          ))}
        </div>
        <div className="rounded-xl bg-blue-pale p-4 text-sm text-blue-deep">
          <p className="font-semibold">Ẩn danh 100%</p>
          <p>SafeBot không lưu danh tính, không hỏi thông tin cá nhân.</p>
        </div>
      </aside>

      <section className="card flex min-h-[560px] flex-col">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-mid text-white">
            🤖
          </div>
          <div>
            <p className="font-semibold text-blue-deep">SafeBot</p>
            <p className="text-xs text-gray-400">Đang online</p>
          </div>
          <div className="ml-auto rounded-full bg-blue-pale px-3 py-1 text-xs font-semibold text-blue-deep">
            Còn {remaining} tin nhắn
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto py-6">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  message.role === "user"
                    ? "bg-blue-mid text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
                dangerouslySetInnerHTML={{
                  __html: message.content
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\n/g, "<br/>"),
                }}
              />
            </div>
          ))}
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>SafeBot đang trả lời</span>
              <span className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-mid" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-mid [animation-delay:0.1s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-mid [animation-delay:0.2s]" />
              </span>
            </div>
          ) : null}
        </div>

        {messages.length === 1 ? (
          <div className="mb-4 flex flex-wrap gap-2">
            {QUICK_REPLIES.map((item) => (
              <button
                key={item}
                onClick={() => sendMessage(item)}
                className="rounded-full border border-blue-light px-3 py-1 text-xs font-semibold text-blue-deep"
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row">
          <input
            className="input"
            placeholder="Nhập câu hỏi..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage(input);
              }
            }}
            disabled={loading || remaining <= 0}
          />
          <button
            className="btn-primary w-full sm:w-auto"
            onClick={() => sendMessage(input)}
            disabled={loading || remaining <= 0}
          >
            Gửi
          </button>
        </div>
      </section>
    </div>
  );
}
