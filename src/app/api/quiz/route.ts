import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const GET = async () => {
  const supabase = createClient();

const koreaTime = dayjs().tz("Asia/Seoul").format("YYYY-MM-DD");

  try {
    const { data, error } = await supabase.from("quizzes").select("*").eq("issue_date", koreaTime).limit(1).single();

    if (error) {
      console.error("퀴즈를 가져오는 도중 오류 발생:", error.message);
      return NextResponse.json({ error: "퀴즈를 가져오는 도중 문제가 발생했습니다." }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("예상치 못한 오류 발생:", err);
    return NextResponse.json({ error: "서버에 문제가 발생했습니다." }, { status: 500 });
  }
};
