import { NextResponse } from "next/server";
import { createServerClient } from "../../../lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "9");
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = await createServerClient();
  let query = supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ message: "Có lỗi xảy ra." }, { status: 500 });
  }

  return NextResponse.json({ data });
}
