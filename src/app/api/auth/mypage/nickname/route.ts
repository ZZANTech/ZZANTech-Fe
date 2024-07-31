import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  const body = await req.json();
  const { nickname, userId } = body;

  const { data: user } = await supabase.from("users").select("*").eq("nickname", nickname).single();

  if (user) {
    return NextResponse.json({ error: "동일한 닉네임이 있습니다." }, { status: 409 });
  }

  const { data: newNickname, error } = await supabase
    .from("users")
    .update({ nickname: nickname })
    .eq("userId", userId)
    .select()
    .single();
  console.log("route >>", newNickname);

  if (newNickname) {
    return NextResponse.json({ message: "변경되었다" }, { status: 200 });
  }

  return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
};
