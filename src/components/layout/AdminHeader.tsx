"use client";

import Image from "next/image";
import Link from "next/link";
import { createBrowserClient } from "../../lib/supabase/client";

export default function AdminHeader() {
  const supabase = createBrowserClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="container-safe flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/safezone-logo.png"
            alt="SafeZone Logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="font-display font-bold text-blue-deep">
            SafeZone Admin
          </span>
          <Link
            href="/"
            className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-400 hover:text-blue-deep"
          >
            {"V\u1ec1 trang ch\u1ee7"}
          </Link>
        </div>
        <button
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold"
          onClick={handleLogout}
        >
          {"\u0110\u0103ng xu\u1ea5t"}
        </button>
      </div>
    </header>
  );
}
