# SafeZone App

SafeZone la nen tang ho tro phong ngua ma tuy hoc duong, ket hop noi dung truyen thong, kenh to giac an danh, chatbot ho tro va dashboard quan tri.

## Tinh nang chinh

- Trang public gom: Home, News, Chatbot, Report.
- Quan tri noi dung bai viet theo cac nhom: `news`, `knowledge`, `law`, `research`.
- Nhan to giac an danh qua API server.
- Dashboard thong ke cho admin.
- Logo moi va bo icon PWA da duoc cap nhat.
- Thu vien bai viet featured + thumbnail minh hoa cho demo.
- Co che fallback demo khi chua co bang `reports` (luu tam vao `tmp/demo-reports.json` khi `ADMIN_DEMO_MODE=true`).

## Cong nghe

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + Postgres)
- Recharts

## Chay local

```bash
npm install
npm run dev
```

Mo trinh duyet:

- Public: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin/dashboard`

## Bien moi truong can thiet

Tao file `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

GOOGLE_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash

RESEND_API_KEY=...
ADMIN_EMAIL=...

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SafeZone
ADMIN_DEMO_MODE=true
```

## Luu y demo reports

Neu Supabase chua co bang `public.reports`:

- API `/api/reports` se fallback luu local vao `tmp/demo-reports.json` (chi khi `ADMIN_DEMO_MODE=true`).
- Dashboard van hien du lieu test de demo.

Khi deploy production, nen tao day du schema Supabase va tat demo mode (`ADMIN_DEMO_MODE=false`).

## Tai lieu lien quan

- [INSTALL.md](./INSTALL.md): tai lieu mo ta + huong dan trien khai chi tiet.
- [Install_App.md](./Install_App.md): huong dan dong goi app (PWA/Capacitor).
