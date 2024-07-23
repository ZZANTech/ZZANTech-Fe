import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const email = data.email as string;
  const password = data.password as string;

  const supabase = createClient();

  const result = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return NextResponse.json("로그인 완료");
}
