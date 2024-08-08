import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/constants";

export const GET = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${BASE_URL}/api/auth/callback`
    }
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error });
  }

  // if (data.url) {
  //   console.log("data.url>>", data.url);
  //   redirect(data.url);
  // }
  return NextResponse.json(data);
};
