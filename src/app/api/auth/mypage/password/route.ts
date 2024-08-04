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
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "인증된 사용자를 가져오는데 실패했습니다" }, { status: 401 });
    }

    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || oldPassword < 6) {
      return NextResponse.json({ error: "비밀번호를 입력 해 주세요" }, { status: 400 });
    }
    if (!user.email) {
      return;
    }

    const {
      data: { user: authorizedUser }
    } = await supabase.auth.signInWithPassword({ email: user.email, password: oldPassword });
    if (!authorizedUser) {
      return NextResponse.json(
        { error: "기존 비밀번호와 일치하지 않습니다 정확하게 다시 입력해 주세요" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase.auth.updateUser({ password: newPassword });

    if (data.user) {
      return NextResponse.json({ message: "비밀번호가 변경되었습니다" });
    }

    if (error) {
      if (error.code === "same_password") {
        console.log(error);
        return NextResponse.json({ error: "현재 비밀번호와 동일합니다" }, { status: 422 });
      }
      return NextResponse.json({ error: "비밀번호 변경에 실패하였습니다" }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "비밀번호 변경에 실패하였습니다" }, { status: 500 });
  }
};
