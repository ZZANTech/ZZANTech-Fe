import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const email = data.email as string;
  const password = data.password as string;

  const supabase = createClient();

  const response = await supabase.auth.signInWithPassword({
    email,
    password
  });

  // if (response.data.session) {
  //   const accessToken = response.data.session?.access_token;
  //   const refreshToken = response.data.session?.refresh_token;
  //   const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  //   if (error) {
  //     console.log(error);
  //   }
  // }

  return NextResponse.json(response);
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
