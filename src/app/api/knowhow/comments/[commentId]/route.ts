import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: { commentId: string } }) => {
  const supabase = createClient();
  const commentId = params.commentId;

  try {
    if (commentId) {
      const { status, statusText } = await supabase.from("knowhow_comments").delete().single();
      console.log(status, statusText);
      return NextResponse.json({ status, statusText });
    } else {
      return NextResponse.json({ error: "유효하지 않은 요청입니다" }, { status: 400 });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
