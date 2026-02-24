import NewsListClient from "../../../components/NewsListClient";
import { createServerClient } from "../../../lib/supabase/server";
import type { Post } from "../../../types";

export const revalidate = 60;

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page ?? "1");
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const posts = (data ?? []) as Post[];

  return (
    <section className="container-safe py-12">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase text-blue-mid">
          Tin tức & tài liệu
        </p>
        <h1 className="reveal font-display text-3xl font-bold text-blue-deep md:text-4xl">
          Cập nhật mới nhất
        </h1>
        <p className="reveal reveal-delay-1 text-sm text-gray-400 md:text-base">
          Tổng hợp bài viết, kiến thức, pháp luật và nghiên cứu mới nhất.
        </p>
      </div>

      <div className="mt-8 md:mt-10">
        <NewsListClient posts={posts} page={page} />
      </div>
    </section>
  );
}
