import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  const body = await req.json();
  const { nickname } = body;

  const { data: user } = await supabase.from("users").select("*").eq("nickname", nickname).single();

  if (user) {
    return NextResponse.json({ error: "동일한 닉네임이 있습니다." }, { status: 409 });
  }
};
