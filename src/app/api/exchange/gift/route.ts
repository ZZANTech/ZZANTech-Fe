import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = createClient();

  try {
    const { data: gifts, error } = await supabase.from("gifts").select("*");
    if (error) {
      throw new Error("기프티콘 정보를 가져오지 못했습니다");
    }
    return NextResponse.json(gifts);
  } catch (e) {
    if (e instanceof Error) {
      NextResponse.json({ eror: e.message });
    } else {
      NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
