import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const email = data.email as string;
  const nickname = data.nickname as string;
  const password = data.password as string;

  const supabase = createClient();

  //supabase.auth.singUp 함수
  await supabase.auth.signUp({
    email,
    password
  });

  // 'users' 테이블에 insert
  await supabase
    .from("users")
    .insert({
      userId: data.user?.id,
      email,
      nickname, //full_name으로 잡아야 소셜로그인도 같이 처리할 수 있다...!
      created_at: data.user?.created_at,
      provider: "email",
      total_point: 0,
      current_point: 0,
      updated_at: null
    })
    .select();

  return NextResponse.json("회원가입 완료");
}
