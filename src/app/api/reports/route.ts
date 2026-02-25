import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import crypto from "crypto";
import { Resend } from "resend";
import { createAdminClient } from "../../../lib/supabase/admin";
import {
  appendDemoReport,
  isMissingReportsTableError,
} from "../../../lib/demoReportsStore";

const schema = z.object({
  category: z.enum(["use", "deal", "pressure", "other"]),
  description: z.string().min(20),
  area: z.string().optional(),
  schoolName: z.string().optional(),
  schoolCode: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const isDemoMode = process.env.ADMIN_DEMO_MODE === "true";
    const payload = await request.json();
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Du lieu khong hop le." },
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
    if (!isDemoMode) {
      const { data: recentReports } = await supabase
        .from("reports")
        .select("id")
        .eq("ip_hash", ipHash)
        .gte("created_at", since);

      if ((recentReports?.length ?? 0) >= 5) {
        return NextResponse.json(
          { message: "Ban da vuot qua gioi han to giac trong 24h." },
          { status: 429 }
        );
      }
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
      if (isDemoMode && isMissingReportsTableError(error.message)) {
        const demoReport = await appendDemoReport({
          category: parsed.data.category,
          area: parsed.data.area,
          description: parsed.data.description,
          school_name: parsed.data.schoolName ?? null,
        });
        return NextResponse.json({ success: true, refCode: demoReport.ref_code });
      }
      return NextResponse.json(
        {
          message: isDemoMode
            ? `Khong the luu to giac: ${error.message}`
            : "Khong the luu to giac.",
        },
        { status: 500 }
      );
    }

    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "SafeZone <no-reply@safezone.tlu.edu.vn>",
          to: process.env.ADMIN_EMAIL,
          subject: "SafeZone - To giac moi",
          html: `
            <p>Da nhan to giac moi.</p>
            <p>Ma tham chieu: <strong>${inserted.ref_code}</strong></p>
            <p>Loai: ${parsed.data.category}</p>
            <p>Khu vuc: ${parsed.data.area ?? "-"}</p>
          `,
        });
      } catch {
        // Keep the submission successful even if email notification fails.
      }
    }

    return NextResponse.json({ success: true, refCode: inserted.ref_code });
  } catch {
    return NextResponse.json({ message: "Co loi xay ra." }, { status: 500 });
  }
}
