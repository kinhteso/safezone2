import PostForm from "../../../../../components/Admin/PostForm";
import { createAdminClient } from "../../../../../lib/supabase/admin";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .single();

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-bold text-blue-deep">
        Chỉnh sửa bài viết
      </h1>
      <PostForm initial={data ?? undefined} />
    </div>
  );
}
