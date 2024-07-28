import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  const { nickname } = await req.json();

  const { data, error } = await supabase.from("users").select("*").eq("nickname", nickname).single();

  console.log("GET data", data);

  if (!data) {
    return NextResponse.json("데이터가 없어요");
  }

  return NextResponse.json("데이터가 들어왔어요");
};
