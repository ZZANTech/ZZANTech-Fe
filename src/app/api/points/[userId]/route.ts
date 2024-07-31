import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { userId } }: { params: { userId: Tables<"users">["userId"] } }) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("points")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    if (error) {
      throw new Error("포인트 상세 내역을 불러오지 못했습니다.");
    }
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof Error) {
      NextResponse.json({ error: e.message });
    } else {
      NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
    }
  }
}
