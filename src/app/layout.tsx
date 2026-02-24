import type { Metadata } from "next";
import { Be_Vietnam_Pro, Montserrat } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SafeZone — Vùng an toàn số cho thế hệ trẻ Việt Nam",
  description:
    "Nền tảng phòng chống ma túy học đường: CMS, SafeBot AI, tố giác ẩn danh, dashboard.",
  applicationName: "Safezone",
  manifest: "/manifest.webmanifest",
  themeColor: "#0A2D6E",
  appleWebApp: {
    title: "Safezone",
    statusBarStyle: "default",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/icons/safezone-icon-192.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={`${beVietnam.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
