import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
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
      return NextResponse.json({ error: "이메일 또는 비밀번호가 잘못되었습니다." }, { status: 401 });
    }

    const session = response.data.session;
    if (session) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("access_token", session.access_token, { httpOnly: true });
      response.cookies.set("refresh_token", session.refresh_token, { httpOnly: true });
      revalidatePath("/", "layout");

      return response;
    }

    return NextResponse.json({ error: "로그인 실패" }, { status: 500 });
  } catch (error) {
    // console.error("요청 처리 중 오류 발생:", error);
    return NextResponse.json({ error: "내부 서버 오류가 발생했습니다." }, { status: 500 });
  }
}

// 로그아웃
export async function DELETE() {
  const supabase = createClient();

  try {
    const data = await supabase.auth.signOut();

    const res = NextResponse.json({ massage: "로그아웃 하였습니다." });
    res.cookies.delete("access_token");
    res.cookies.delete("refresh_token");
    return res;
  } catch (error) {
    return NextResponse.json({ error: "알 수 없는 오류가 발생했습니다" }, { status: 500 });
  }
}
