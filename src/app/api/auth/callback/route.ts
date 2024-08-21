import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    // code로 읽은 'data' 입맛에 맞게 변수 주기
    const userId: string = data.user?.id || "";
    const email: string = data.user?.email || "";
    const full_name: string = data.user?.user_metadata.full_name || "";
    const provider: string = data.user?.app_metadata.provider || "";
    const created_at: string = data.user?.created_at || "";

    // 'users' 테이블에 insert
    if (data) {
      if (data.user?.user_metadata.is_blocked) {
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/login/blocked`);
      }
      const { data: users, error: usersError } = await supabase.from("users").select("*").eq("userId", userId).single();

      if (users === null) {
        await supabase
          .from("users")
          .insert([
            {
              userId,
              email,
              nickname: full_name,
              created_at,
              provider,
              total_point: 0,
              current_point: 0,
              updated_at: null
            }
          ])
          .select();
      }
      const session = data?.session;
      if (session) {
        cookies().set("access_token", session.access_token, { httpOnly: true });
        cookies().set("refresh_token", session.refresh_token, { httpOnly: true });
      }
    }

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
