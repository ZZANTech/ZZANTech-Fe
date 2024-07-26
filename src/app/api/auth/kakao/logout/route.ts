import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  return NextResponse.json("카카오톡 로그아웃 완료");
}
