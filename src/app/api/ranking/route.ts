import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = createClient();

  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .order("total_point", { ascending: false })
      .limit(5);
    if (error) {
      throw new Error("포인트 랭킹 정보를 불러오지 못했습니다.");
    }
    return NextResponse.json(users);
  } catch (e) {
    if (e instanceof Error) {
      NextResponse.json({ eror: e.message });
    } else {
      NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
