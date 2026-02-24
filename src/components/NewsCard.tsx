import Link from "next/link";
import { formatDate } from "../lib/utils";
import type { Post } from "../types";

const categoryLabels: Record<Post["category"], string> = {
  news: "Tin tức",
  knowledge: "Kiến thức",
  law: "Pháp luật",
  research: "Nghiên cứu",
};

const categoryBadge: Record<Post["category"], string> = {
  news: "bg-blue-50 text-blue-800",
  knowledge: "bg-green-50 text-green-800",
  law: "bg-red-50 text-red-800",
  research: "bg-purple-50 text-purple-800",
};

export default function NewsCard({ post }: { post: Post }) {
  return (
    <Link href={`/news/${post.slug}`} className="card h-full">
      <div className="flex h-40 items-center justify-center rounded-xl bg-blue-pale text-blue-mid md:h-44">
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <span className="text-sm font-semibold">SafeZone</span>
        )}
      </div>
      <div className="mt-4 space-y-3">
        <span
          className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${categoryBadge[post.category]}`}
        >
          {categoryLabels[post.category]}
        </span>
        <h3 className="text-lg font-semibold text-blue-deep">{post.title}</h3>
        <p className="text-sm text-gray-400">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{formatDate(post.created_at)}</span>
          <span>{post.view_count} lượt xem</span>
        </div>
      </div>
    </Link>
  );
}
