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

  let query = supabase.from("reports").select("*").order("created_at", {
    ascending: false,
  });
  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ message: "Có lỗi xảy ra." }, { status: 500 });
  }

  return NextResponse.json({ data });
}
