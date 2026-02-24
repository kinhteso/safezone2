"use client";

import { useEffect, useMemo, useState } from "react";
import slugify from "slugify";
import dynamic from "next/dynamic";
import { createBrowserClient } from "../../lib/supabase/client";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type PostFormProps = {
  initial?: {
    id?: string;
    title?: string;
    slug?: string;
    category?: string;
    excerpt?: string;
    content?: string;
    thumbnail?: string;
    published?: boolean;
  };
};

const categories = [
  { value: "news", label: "Tin tức" },
  { value: "knowledge", label: "Kiến thức" },
  { value: "law", label: "Pháp luật" },
  { value: "research", label: "Nghiên cứu" },
];

export default function PostForm({ initial }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "news");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const supabase = createBrowserClient();

  useEffect(() => {
    if (!initial?.slug && title) {
      setSlug(
        slugify(title, {
          lower: true,
          strict: true,
        })
      );
    }
  }, [title, initial?.slug]);

  const excerptCount = useMemo(() => 200 - excerpt.length, [excerpt]);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    const payload = {
      title,
      slug,
      category,
      excerpt,
      content,
      thumbnail,
      published,
    };

    try {
      const response = await fetch(
        initial?.id ? `/api/admin/posts/${initial.id}` : "/api/admin/posts",
        {
          method: initial?.id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("Failed");
      }
      setMessage("Đã lưu bài viết.");
    } catch (error) {
      setMessage("Không thể lưu bài viết.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card space-y-6">
      <div>
        <label className="text-sm font-semibold text-gray-800">Tiêu đề</label>
        <input
          className="input mt-2"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-gray-800">Slug</label>
        <input
          className="input mt-2"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-gray-800">Danh mục</label>
        <select
          className="input mt-2"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-semibold text-gray-800">Excerpt</label>
        <textarea
          className="input mt-2 min-h-[90px]"
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          maxLength={200}
        />
        <p className="text-xs text-gray-400">
          Còn {excerptCount} ký tự
        </p>
      </div>
      <div>
        <label className="text-sm font-semibold text-gray-800">Thumbnail</label>
        <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center">
          <input
            className="input flex-1"
            placeholder="https://..."
            value={thumbnail}
            onChange={(event) => setThumbnail(event.target.value)}
          />
          <label className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-400 cursor-pointer">
            Tải ảnh lên
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const filePath = `thumbnails/${Date.now()}-${file.name}`;
                const { data, error } = await supabase.storage
                  .from("thumbnails")
                  .upload(filePath, file, { upsert: true });
                if (!error && data?.path) {
                  const { data: publicUrl } = supabase.storage
                    .from("thumbnails")
                    .getPublicUrl(data.path);
                  setThumbnail(publicUrl.publicUrl);
                }
              }}
            />
          </label>
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-gray-800">Nội dung</label>
        <div className="mt-2">
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>
      </div>
      <label className="flex items-center gap-3 text-sm text-gray-400">
        <input
          type="checkbox"
          checked={published}
          onChange={(event) => setPublished(event.target.checked)}
        />
        Publish ngay
      </label>
      {message ? (
        <p className="text-sm font-semibold text-blue-mid">{message}</p>
      ) : null}
      <button className="btn-primary" onClick={save} disabled={saving}>
        {saving ? "Đang lưu..." : "Lưu bài viết"}
      </button>
    </div>
  );
}
