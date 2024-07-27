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

  if (response.data.session) {
    const accessToken = response.data.session?.access_token;
    const refreshToken = response.data.session?.refresh_token;
    const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
    if (error) {
      console.log(error);
    }
  }

  return NextResponse.json(response);
}
