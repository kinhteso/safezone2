"use client";

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
        <Link href="/admin/dashboard" className="font-display font-bold">
          SafeZone Admin
        </Link>
        <button
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
