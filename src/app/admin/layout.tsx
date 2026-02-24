import { redirect } from "next/navigation";
import AdminHeader from "../../components/layout/AdminHeader";
import { createServerClient } from "../../lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.ADMIN_DEMO_MODE !== "true") {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/admin/login");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="container-safe py-8">{children}</main>
    </div>
  );
}
