import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

async function GET(request: NextRequest) {
  // const data = await request.json();
  // const email = data.email as string;
  // const password = data.password as string;

  const supabase = createClient();

  const { data: userNickname, error } = await supabase
    .from("users")
    .update({ nickname: "뽀용" })
    .eq("userId", "ee9f2051-3d18-4353-852d-f07d3e2f9c43") //여기! 수정!
    .select();

  return NextResponse.json(userNickname);
}

export default GET;
