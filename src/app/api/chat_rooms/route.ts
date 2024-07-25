import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const GET = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("chat_rooms").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};
