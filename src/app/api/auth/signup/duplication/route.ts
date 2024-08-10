import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const email = data.email as string;
    const supabase = createClient();

    let { data: users, error } = await supabase.from("users").select("*").eq(`${email}`, email);
    if (users!.length > 0) {
    } else {
      console.log("error", error);
      return NextResponse.json({ error }, { status: 500 });
    }
  } catch (error) {}
  return NextResponse.json("");
}
