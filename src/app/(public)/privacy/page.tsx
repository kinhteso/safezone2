export default function PrivacyPage() {
  return (
    <section className="container-safe py-12 space-y-6">
      <h1 className="font-display text-4xl font-bold text-blue-deep">
        Chính sách Bảo mật
      </h1>
      <div className="card space-y-3 text-sm text-gray-400">
        <p>Chúng tôi không thu thập thông tin cá nhân.</p>
        <p>Dữ liệu chat tự xóa sau 7 ngày.</p>
        <p>Tố giác được ẩn danh hoàn toàn.</p>
        <p>Không bán/chia sẻ dữ liệu với bên thứ 3.</p>
      </div>
    </section>
  );
}
