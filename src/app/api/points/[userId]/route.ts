import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { userId } }: { params: { userId: Tables<"users">["userId"] } }) {
  const supabase = createClient();
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const offset = (page - 1) * limit;

  try {
    const { data, error, count } = await supabase
      .from("points")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error("포인트 상세 내역을 불러오지 못했습니다.");
    }

    return NextResponse.json({
      data,
      totalCount: count ?? 0
    });
  } catch (e) {
    if (e instanceof Error) {
      NextResponse.json({ error: e.message });
    } else {
      NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
    }
  }
}
