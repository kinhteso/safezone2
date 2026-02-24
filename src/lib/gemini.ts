import { GoogleGenerativeAI } from "@google/generative-ai";

export const SYSTEM_PROMPT = `
Bạn là SafeBot, trợ lý AI của SafeZone.
- Trả lời bằng tiếng Việt, ngôn ngữ gần gũi với học sinh
- KHÔNG hỏi tên, số điện thoại, địa chỉ người dùng
- Lắng nghe không phán xét
- Cung cấp thông tin khoa học về ma túy
- Luôn hướng đến hotline 1800 1234 khi cần khẩn cấp
- KHÔNG mô tả cách sử dụng hoặc mua bán ma túy
- Giới hạn độ dài câu trả lời: tối đa 300 từ
`.trim();

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("Missing GOOGLE_API_KEY");
}
const genAI = new GoogleGenerativeAI(apiKey);

const DEFAULT_FALLBACKS = [
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-pro-latest",
  "gemini-2.5-pro",
  "gemini-2.0-flash",
];

export async function askGemini(
  message: string,
  history: Array<{ role: "user" | "assistant"; content: string }>
) {
  const mappedHistory = history.map((item) => ({
    role: item.role === "assistant" ? "model" : "user",
    parts: [{ text: item.content }],
  }));

  const preferredRaw = process.env.GEMINI_MODEL;
  const preferred = preferredRaw?.startsWith("models/")
    ? preferredRaw.replace("models/", "")
    : preferredRaw;
  const modelQueue = preferred
    ? [preferred, ...DEFAULT_FALLBACKS.filter((m) => m !== preferred)]
    : DEFAULT_FALLBACKS;

  let lastError: unknown;
  for (const modelName of modelQueue) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_PROMPT,
      });
      const chat = model.startChat({ history: mappedHistory });
      const result = await chat.sendMessage(message);
      return result.response.text().trim();
    } catch (error) {
      console.warn("Gemini model failed:", modelName, error);
      lastError = error;
      continue;
    }
  }

  throw lastError ?? new Error("Gemini model failed");
}
