import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";

export const GET = async () => {
  const supabase = createClient();
  const today = dayjs().format("YYYY-MM-DD");

  const { data, error } = await supabase.from("quizzes").select("*").eq("issue_date", today).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};
