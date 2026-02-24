"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/news", label: "Tin tức" },
  { href: "/chatbot", label: "SafeBot" },
  { href: "/report", label: "Tố giác", highlight: true },
  { href: "/admin/dashboard", label: "Dashboard" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="container-safe flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          <div className="leading-tight">
            <p className="font-display text-lg font-extrabold text-blue-deep">
              SafeZone
            </p>
            <p className="text-xs text-gray-400">Vùng an toàn số</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            const baseClasses =
              "rounded-lg px-3 py-2 text-sm font-semibold transition";
            const activeClasses = isActive
              ? "bg-blue-50 text-blue-deep"
              : "text-gray-800 hover:text-blue-deep";
            const dangerClasses = link.highlight
              ? "bg-red-alert text-white hover:bg-red-600 animate-pulseSoft"
              : "";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${baseClasses} ${activeClasses} ${dangerClasses}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="lg:hidden rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="container-safe flex flex-col gap-2 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                  link.highlight
                    ? "bg-red-alert text-white"
                    : "bg-gray-50 text-gray-800"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
