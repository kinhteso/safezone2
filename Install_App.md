# SafeZone - Huong Dan Cai Dat App (iOS va Android)

Tai lieu nay huong dan dong goi SafeZone thanh ung dung co the cai dat tren dien thoai.

## 1. Lua chon trien khai

### A. PWA (khuyen nghi cho giai doan dau)

Uu diem:

- Trien khai nhanh
- Chi phi thap
- Khong can duyet store

Nhuoc diem:

- Han che mot so tinh nang native tren iOS

### B. Capacitor (native wrapper)

Uu diem:

- Co the len App Store / Google Play
- Tich hop duoc tinh nang native sau nay

Nhuoc diem:

- Quy trinh build va duyet phuc tap hon

## 2. Dong goi PWA

### 2.1 Cai package

```bash
npm install next-pwa
```

### 2.2 Cau hinh `next.config.mjs`

```js
import nextPwa from "next-pwa";

const withPwa = nextPwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPwa(nextConfig);
```

### 2.3 Build va run

```bash
npm run build
npm run start
```

### 2.4 Cai tren thiet bi

- Android (Chrome): Add to Home Screen
- iOS (Safari): Share -> Add to Home Screen

## 3. Dong goi bang Capacitor

### 3.1 Cai dat

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```

### 3.2 Them platform

```bash
npx cap add android
npx cap add ios
```

### 3.3 Build web + sync

```bash
npm run build
npx cap sync
```

### 3.4 Mo IDE native

```bash
npx cap open android
npx cap open ios
```

## 4. Checklist truoc khi phat hanh

- Icon ung dung day du kich thuoc
- Splash screen
- Privacy policy URL
- HTTPS domain
- Kiem tra login/admin mode tren moi truong production

## 5. Luu y rieng cho SafeZone

- SafeBot va API can internet de hoat dong.
- Neu demo noi bo: co the de `ADMIN_DEMO_MODE=true`.
- Neu production: bat buoc set `ADMIN_DEMO_MODE=false`.
- Kiem tra logo/app icon moi da dong bo trong `public/icons`.
