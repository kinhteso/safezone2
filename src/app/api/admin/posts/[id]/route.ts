import { NextResponse } from "next/server";
import { createAdminClient } from "../../../../../lib/supabase/admin";
import { createServerClient } from "../../../../../lib/supabase/server";

async function requireUser() {
  const supabaseAuth = await createServerClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  return user;
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("posts")
    .update(payload)
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ message: "Không thể cập nhật." }, { status: 500 });
  }
  return NextResponse.json({ data });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  return PUT(request, { params });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("posts").delete().eq("id", params.id);
  if (error) {
    return NextResponse.json({ message: "Không thể xóa." }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
