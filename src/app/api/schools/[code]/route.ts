import { NextResponse } from "next/server";
import { createServerClient } from "../../../../lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("schools")
    .select("*")
    .eq("code", params.code)
    .single();

  if (error || !data) {
    return NextResponse.json({ message: "Không tìm thấy trường." }, { status: 404 });
  }

  return NextResponse.json({ data });
}
