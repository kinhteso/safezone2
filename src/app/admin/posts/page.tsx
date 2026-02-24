import Link from "next/link";
import { createAdminClient } from "../../../lib/supabase/admin";
import type { Post } from "../../../types";
import { formatDate } from "../../../lib/utils";

export default async function AdminPostsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const posts = (data ?? []) as Post[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-blue-deep">
            Quản lý bài viết
          </h1>
          <p className="text-sm text-gray-400">
            Theo dõi trạng thái và lượt xem bài viết.
          </p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary">
          Tạo bài mới
        </Link>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="py-2">Tiêu đề</th>
              <th className="py-2">Danh mục</th>
              <th className="py-2">Trạng thái</th>
              <th className="py-2">Ngày</th>
              <th className="py-2">Lượt xem</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-gray-100">
                <td className="py-3">
                  <p className="font-semibold text-blue-deep">{post.title}</p>
                </td>
                <td className="py-3">{post.category}</td>
                <td className="py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      post.published
                        ? "bg-green-50 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="py-3">{formatDate(post.created_at)}</td>
                <td className="py-3">{post.view_count}</td>
                <td className="py-3">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-blue-mid hover:text-blue-deep"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
