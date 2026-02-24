import { NextResponse } from "next/server";
import { createAdminClient } from "../../../../lib/supabase/admin";
import { createServerClient } from "../../../../lib/supabase/server";

export async function GET(request: Request) {
  const supabaseAuth = await createServerClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const supabase = createAdminClient();
  let query = supabase.from("posts").select("*").order("created_at", {
    ascending: false,
  });
  if (status === "draft") {
    query = query.eq("published", false);
  }
  if (status === "published") {
    query = query.eq("published", true);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ message: "Có lỗi xảy ra." }, { status: 500 });
  }
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const supabaseAuth = await createServerClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("posts").insert(payload).select("*");
  if (error) {
    return NextResponse.json({ message: "Không thể tạo bài viết." }, { status: 500 });
  }
  return NextResponse.json({ data: data?.[0] });
}
