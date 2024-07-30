import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const supabase = createClient();

  const nickname = await req.json();
  const userId = await req.json();
  console.log("route nickname >> ", userId);

  const { data } = await supabase.from("users").select("*").eq("nickname", nickname).single();

  console.log("route data >>", data);

  if (!data) {
    return NextResponse.json("사용 가능한 닉네임입니다.");
  }

  if (data) {
    return NextResponse.json({ error: "동일한 닉네임이 있습니다." }, { status: 409 });
  }

  const { data: users, error } = await supabase
    .from("users")
    .update({ nickname: nickname })
    .eq("userId", userId)
    .select()
    .single();

  return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
};
