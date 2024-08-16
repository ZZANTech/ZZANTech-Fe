import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const email = data.email as string;
    const supabase = createClient();

    const { data: user, error } = await supabase.from("users").select("*").eq("email", email);

    if (user!.length > 0) {
      return NextResponse.json({ error: "이미 사용 중입니다." }, { status: 409 });
    } else {
      return NextResponse.json({ status: 200 });
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
  }
}
