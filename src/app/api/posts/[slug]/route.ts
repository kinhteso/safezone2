import { NextResponse } from "next/server";
import { createAdminClient } from "../../../../lib/supabase/admin";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createAdminClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !post) {
    return NextResponse.json({ message: "Không tìm thấy bài." }, { status: 404 });
  }

  await supabase
    .from("posts")
    .update({ view_count: (post.view_count ?? 0) + 1 })
    .eq("id", post.id);

  return NextResponse.json({ data: post });
}
