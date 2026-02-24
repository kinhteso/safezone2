import { NextResponse } from "next/server";
import { askGemini } from "../../../lib/gemini";
import { createAdminClient } from "../../../lib/supabase/admin";

const MAX_MESSAGES = 20;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, sessionToken, schoolCode } = body ?? {};

    if (!message || !sessionToken) {
      return NextResponse.json(
        { error: "INVALID_REQUEST", message: "Thiếu dữ liệu." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data: existing } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("session_token", sessionToken)
      .maybeSingle();

    if (existing && existing.msg_count >= MAX_MESSAGES) {
      return NextResponse.json(
        {
          error: "SESSION_LIMIT_REACHED",
          message: "Đã dùng hết 20 tin nhắn trong session này.",
        },
        { status: 429 }
      );
    }

    const history = (existing?.messages ?? []).map((item: any) => ({
      role: item.role,
      content: item.content,
    }));

    const reply = await askGemini(message, history);

    const updatedMessages = [
      ...(existing?.messages ?? []),
      { role: "user", content: message },
      { role: "assistant", content: reply },
    ];

    const msgCount = (existing?.msg_count ?? 0) + 1;

    let schoolId: string | null = null;
    if (schoolCode) {
      const { data: school } = await supabase
        .from("schools")
        .select("id")
        .eq("code", schoolCode)
        .maybeSingle();
      schoolId = school?.id ?? null;
    }

    if (!existing) {
      await supabase.from("chat_sessions").insert({
        session_token: sessionToken,
        messages: updatedMessages,
        msg_count: msgCount,
        school_id: schoolId,
      });
    } else {
      await supabase
        .from("chat_sessions")
        .update({
          messages: updatedMessages,
          msg_count: msgCount,
          last_active: new Date().toISOString(),
        })
        .eq("id", existing.id);
    }

    return NextResponse.json({
      reply,
      msgCount,
      remaining: MAX_MESSAGES - msgCount,
    });
  } catch (error) {
    console.error("SafeBot /api/chat error:", error);
    return NextResponse.json(
      {
        error: "SERVER_ERROR",
        message:
          process.env.NODE_ENV === "development"
            ? String((error as Error)?.message ?? error)
            : "Có lỗi xảy ra.",
      },
      { status: 500 }
    );
  }
}
