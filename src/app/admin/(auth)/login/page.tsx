"use client";

import { useState } from "react";
import { createBrowserClient } from "../../../../lib/supabase/client";

export default function AdminLoginPage() {
  const supabase = createBrowserClient();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/dashboard`,
      },
    });
    if (authError) {
      setError("Không thể gửi email đăng nhập.");
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="card w-full max-w-md">
        <h1 className="font-display text-2xl font-bold text-blue-deep">
          Đăng nhập Admin
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          SafeZone dùng đăng nhập bằng magic link.
        </p>
        <input
          className="input mt-6"
          placeholder="admin@school.edu.vn"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {error ? (
          <p className="mt-3 text-sm font-semibold text-red-alert">{error}</p>
        ) : null}
        {sent ? (
          <p className="mt-4 text-sm font-semibold text-green-safe">
            Đã gửi link đăng nhập qua email.
          </p>
        ) : null}
        <button className="btn-primary mt-6 w-full" onClick={handleLogin}>
          Gửi magic link
        </button>
      </div>
    </div>
  );
}
