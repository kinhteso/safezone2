import PostForm from "../../../../components/Admin/PostForm";

export default function NewPostPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-bold text-blue-deep">
        Tạo bài viết mới
      </h1>
      <PostForm />
    </div>
  );
}
