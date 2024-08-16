import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  const body = await req.json();
  const { nickname, email } = body;

  // 닉네임 update
  const { data, error } = await supabase.from("users").update({ nickname: nickname }).eq("email", email).select();

  if (data) {
    return NextResponse.json({ message: "변경 완료" }, { status: 200 });
  }

  if (error) {
    return NextResponse.json({ error: `${error}` }, { status: 401 });
  }

  return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
};
