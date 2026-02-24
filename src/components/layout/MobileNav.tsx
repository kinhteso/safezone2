"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ" },
  { href: "/news", label: "Tin tức" },
  { href: "/chatbot", label: "SafeBot" },
  { href: "/report", label: "Tố giác" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav__item ${isActive ? "is-active" : ""}`}
          >
            <span className="text-[11px] font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
