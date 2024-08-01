import { createClient } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  const supabase = createClient();
  const userId = params.userId;

  try {
    const { data: gifts, error } = await supabase.from("gift_claims").select("*").eq("user_id", userId);
    if (error) {
      throw new Error("기프티콘 신청 내역을 가져오지 못했습니다");
    }
    return NextResponse.json(gifts);
  } catch (e) {
    if (e instanceof Error) {
      NextResponse.json({ eror: e.message });
    } else {
      NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
