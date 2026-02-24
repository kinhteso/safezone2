"use client";

import { useMemo, useState } from "react";
import type { Post } from "../types";
import NewsCard from "./NewsCard";

const categories = [
  { value: "all", label: "Tất cả" },
  { value: "news", label: "Tin tức" },
  { value: "knowledge", label: "Kiến thức" },
  { value: "law", label: "Pháp luật" },
  { value: "research", label: "Nghiên cứu" },
];

export default function NewsListClient({
  posts,
  page,
  perPage = 9,
}: {
  posts: Post[];
  page: number;
  perPage?: number;
}) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory =
        category === "all" ? true : post.category === category;
      const matchQuery = post.title
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [posts, category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (page - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item.value}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === item.value
                  ? "bg-blue-mid text-white"
                  : "bg-white text-gray-400 border border-gray-100"
              }`}
              onClick={() => setCategory(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <input
          className="input w-full max-w-xs"
          placeholder="Tìm kiếm bài viết..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {current.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <a
              key={pageNumber}
              href={`?page=${pageNumber}`}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                pageNumber === page
                  ? "bg-blue-mid text-white"
                  : "border border-gray-100 text-gray-400"
              }`}
            >
              {pageNumber}
            </a>
          );
        })}
      </div>
    </div>
  );
}
