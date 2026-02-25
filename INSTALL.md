# SafeZone - Tai Lieu Mo Ta va Huong Dan Trien Khai

Tai lieu nay mo ta phien ban hien tai cua SafeZone va cach trien khai trong moi truong dev/prod.

## 1. Tong quan he thong

SafeZone gom 4 khoi chinh:

1. News/CMS: bai viet thuoc nhom tin tuc, kien thuc, phap luat, nghien cuu.
2. Chatbot: ho tro hoi dap va dinh huong thong tin.
3. Report: gui to giac an danh.
4. Admin dashboard: KPI, bieu do, danh sach to giac moi.

Cap nhat moi trong ban nay:

- Da cap nhat logo chinh: `public/icons/safezone-logo.png`.
- Da cap nhat bo icon PWA (`192`, `512`, `apple-touch-icon`).
- Da bo sung tap bai viet featured va thumbnail bieu trung trong `public/news-thumbnails`.
- Da bo sung fallback demo reports khi chua co bang `reports`.
- Da toi uu dashboard de co du lieu chu ky de demo khi API tra rong.

## 2. Yeu cau moi truong

- Node.js 18+
- npm 9+
- Tai khoan Supabase
- API key cho Gemini (neu dung chatbot)
- RESEND_API_KEY (neu gui email thong bao)

## 3. Cai dat

```bash
git clone https://github.com/kinhteso/safezone2.git
cd safezone-app
npm install
```

## 4. Tao `.env.local`

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
ADMIN_DEMO_MODE=true
```

## 5. Chay local

```bash
npm run dev
```

URL nhanh:

- `/`
- `/news`
- `/chatbot`
- `/report`
- `/admin/dashboard`

## 6. Luu y schema Supabase

Can tao day du cac bang theo thiet ke cua du an, toi thieu gom:

- `posts`
- `reports`
- `daily_stats`
- `schools`

Neu chua co bang `reports` va dang demo mode:

- API van cho gui to giac.
- Du lieu demo duoc ghi vao `tmp/demo-reports.json`.
- Dashboard van hien du lieu test.

## 7. Deploy

Co the deploy len Vercel. Sau khi deploy:

- Set day du env variables tren Vercel.
- Set `NEXT_PUBLIC_SITE_URL` bang domain that.
- Khuyen nghi `ADMIN_DEMO_MODE=false` cho production.

## 8. Kiem tra nhanh sau deploy

1. Gui thu report tai `/report`.
2. Vao `/admin/dashboard` kiem tra KPI + bieu do + bang report.
3. Kiem tra `/news` va trang chi tiet bai viet.

## 9. Bao mat

- Khong expose `SUPABASE_SERVICE_ROLE_KEY` cho client.
- Tat demo mode khi dua vao production.
- Gioi han quyen truy cap admin qua auth + middleware.
