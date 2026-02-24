import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerClient } from "../../../../lib/supabase/server";
import { formatDate } from "../../../../lib/utils";
import NewsCard from "../../../../components/NewsCard";
import type { Post } from "../../../../types";

export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createServerClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!post) {
    return notFound();
  }

  await supabase
    .from("posts")
    .update({ view_count: (post.view_count ?? 0) + 1 })
    .eq("id", post.id);

  const { data: relatedData } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("category", post.category)
    .neq("id", post.id)
    .limit(3);

  const related = (relatedData ?? []) as Post[];

  return (
    <section className="container-safe py-12">
      <nav className="text-sm text-gray-400">
        <Link href="/news" className="hover:text-blue-mid">
          Tin tức
        </Link>
        <span className="mx-2">/</span>
        <span>{post.title}</span>
      </nav>

      <div className="mt-6 space-y-4">
        <h1 className="font-display text-4xl font-bold text-blue-deep">
          {post.title}
        </h1>
        <p className="text-sm text-gray-400">
          {formatDate(post.created_at)} · {post.view_count + 1} lượt xem
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-8">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold text-blue-deep">
          Bài viết liên quan
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <NewsCard key={item.id} post={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
