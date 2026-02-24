# SafeZone — Hướng Dẫn Cài Đặt (Local + Deploy)

Tài liệu này hướng dẫn cài đặt và chạy SafeZone Phase 1 theo đặc tả kỹ thuật.

## Yêu cầu môi trường

- Node.js 18+
- npm 9+
- Tài khoản Supabase
- Google AI Studio API key (Gemini)
- Resend API key

## 1. Cài đặt project

```bash
git clone https://github.com/<user>/safezone-app.git
cd safezone-app
npm install
```

## 2. Tạo `.env.local`

Tạo file `.env.local` ở root dự án:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

GOOGLE_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash

RESEND_API_KEY=...
ADMIN_EMAIL=safezone.tlu@gmail.com

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SafeZone
```

## 3. Thiết lập Supabase

1. Tạo project mới trên Supabase.
2. Mở SQL Editor và chạy toàn bộ schema trong đặc tả Phase 1.
3. Bật RLS cho các bảng theo spec.
4. Tạo Storage bucket `thumbnails` (Public).
5. (Tuỳ chọn) Seed dữ liệu trường pilot:

```sql
INSERT INTO schools (name, code, type, province)
VALUES ('Đại học Thủy Lợi', 'TLU', 'university', 'Hà Nội');
```

## 4. Chạy dev server

```bash
npm run dev
```

Mở `http://localhost:3000`.

## 5. Test nhanh

- Trang chủ: `/`
- Tin tức: `/news`
- SafeBot: `/chatbot`
- Tố giác: `/report`
- Admin: `/admin/login`

## 6. Deploy lên Vercel

### Cách 1: Dashboard

1. Push code lên GitHub.
2. Vercel → New Project → Import repo.
3. Add Environment Variables từ `.env.local`.
4. Deploy.

### Cách 2: CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 7. Lưu ý bảo mật

- Không expose `SUPABASE_SERVICE_ROLE_KEY` ở client.
- Chỉ chạy API admin bằng server-side.
- Thu hồi và tạo mới API key nếu lộ.

---

Nếu cần hỗ trợ thêm, liên hệ: `safezone.tlu@gmail.com`
