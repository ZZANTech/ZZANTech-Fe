import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "이메일을 입력해주세요" }, { status: 400 });
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.BASE_URL}/mypage/edit`
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "메일이 도착했는지 확인해주세요" });
  } catch (error) {
    return NextResponse.json({ error: "알 수 없는 오류가 발생했습니다" }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  const supabase = createClient();

  try {
    const password = await req.json();

    if (!password) {
      return NextResponse.json({ error: "비밀번호를 입력해주세요" }, { status: 400 });
    }

    const { data, error } = await supabase.auth.updateUser(password);
    console.log("rote PATCH >>", data);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "비밀번호가 성공적으로 변경되었습니다" });
  } catch (error) {
    return NextResponse.json({ error: "알 수 없는 오류가 발생했습니다" }, { status: 500 });
  }
};
