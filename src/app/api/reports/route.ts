import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import crypto from "crypto";
import { Resend } from "resend";
import { createAdminClient } from "../../../lib/supabase/admin";

const schema = z.object({
  category: z.enum(["use", "deal", "pressure", "other"]),
  description: z.string().min(20),
  area: z.string().optional(),
  schoolName: z.string().optional(),
  schoolCode: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Dữ liệu không hợp lệ." },
        { status: 400 }
      );
    }

    const headerList = await headers();
    const forwarded = headerList.get("x-forwarded-for") ?? "0.0.0.0";
    const ip = forwarded.split(",")[0].trim();
    const dailySalt = new Date().toISOString().slice(0, 10);
    const ipHash = crypto
      .createHash("sha256")
      .update(`${ip}-${dailySalt}`)
      .digest("hex");

    const supabase = createAdminClient();
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: recentReports } = await supabase
      .from("reports")
      .select("id")
      .eq("ip_hash", ipHash)
      .gte("created_at", since);

    if ((recentReports?.length ?? 0) >= 5) {
      return NextResponse.json(
        { message: "Bạn đã vượt quá giới hạn tố giác trong 24h." },
        { status: 429 }
      );
    }

    let schoolId: string | null = null;
    if (parsed.data.schoolCode) {
      const { data: school } = await supabase
        .from("schools")
        .select("id")
        .eq("code", parsed.data.schoolCode)
        .maybeSingle();
      schoolId = school?.id ?? null;
    }

    const { data: inserted, error } = await supabase
      .from("reports")
      .insert({
        category: parsed.data.category,
        description: parsed.data.description,
        area: parsed.data.area ?? null,
        school_name: parsed.data.schoolName ?? null,
        school_id: schoolId,
        ip_hash: ipHash,
      })
      .select("ref_code")
      .single();

    if (error) {
      return NextResponse.json(
        { message: "Không thể lưu tố giác." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "SafeZone <no-reply@safezone.tlu.edu.vn>",
      to: process.env.ADMIN_EMAIL!,
      subject: "SafeZone - Tố giác mới",
      html: `
        <p>Đã nhận tố giác mới.</p>
        <p>Mã tham chiếu: <strong>${inserted.ref_code}</strong></p>
        <p>Loại: ${parsed.data.category}</p>
        <p>Khu vực: ${parsed.data.area ?? "-"}</p>
      `,
    });

    return NextResponse.json({ success: true, refCode: inserted.ref_code });
  } catch (error) {
    return NextResponse.json(
      { message: "Có lỗi xảy ra." },
      { status: 500 }
    );
  }
}
