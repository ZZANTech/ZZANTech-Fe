import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export async function GET() {
  const supabase = createClient();

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const user_id = user.id;
  const todayStart = dayjs().utc().startOf("day").toISOString();

  const { data, error } = await supabase
    .from("answers")
    .select("answerId")
    .eq("user_id", user_id)
    .gte("created_at", todayStart)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const hasTakenQuiz = !!data;

  return NextResponse.json({ hasTakenQuiz });
}
