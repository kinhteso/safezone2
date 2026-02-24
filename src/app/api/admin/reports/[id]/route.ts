import { NextResponse } from "next/server";
import { createAdminClient } from "../../../../../lib/supabase/admin";
import { createServerClient } from "../../../../../lib/supabase/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabaseAuth = await createServerClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reports")
    .update(payload)
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ message: "Không thể cập nhật." }, { status: 500 });
  }
  return NextResponse.json({ data });
}
