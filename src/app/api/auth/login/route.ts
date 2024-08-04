import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const email = data.email as string;
    const password = data.password as string;

    const supabase = createClient();

    const response = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (response.error) {
      console.error("Supabase 인증 오류:", response.error);
      return NextResponse.json({ error: "이메일 또는 비밀번호가 잘못되었습니다." }, { status: 401 });
    }

    if (response.data.session) {
      const accessToken = response.data.session?.access_token;
      const refreshToken = response.data.session?.refresh_token;
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
      if (sessionError) {
        console.error("세션 설정 중 오류 발생:", sessionError);
        return NextResponse.json({ error: "세션 설정 중 오류가 발생했습니다." }, { status: 500 });
      }
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("요청 처리 중 오류 발생:", error);
    return NextResponse.json({ error: "내부 서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE() {
  const supabase = createClient();

  try {
    const data = await supabase.auth.signOut();
    console.log("login >> ", data);
    return NextResponse.json({ massage: "로그아웃 하였습니다." });
  } catch (error) {
    return NextResponse.json({ error: "알 수 없는 오류가 발생했습니다" }, { status: 500 });
  }
}
