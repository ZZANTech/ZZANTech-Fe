import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  const body = await req.json();
  const { nickname, email } = body;

  // 중복확인
  const { data: user } = await supabase.from("users").select("*").eq("nickname", nickname).single();

  if (user) {
    return NextResponse.json({ error: "동일한 닉네임이 있습니다." }, { status: 409 });
  }

  // 닉네임 update
  const { data, error } = await supabase
    .from("users")
    .update({ nickname: "qwer1" })
    .eq("email", "joy@gmail.com")
    .select();

  console.log("route error >>", error);
  console.log("route data >>", data);

  if (data) {
    // console.log("route >>", data);
    return NextResponse.json({ message: "변경되었다" }, { status: 200 });
  }
  if (error) {
    return NextResponse.json({ error: `${error}` }, { status: 401 });
  }

  return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
};
