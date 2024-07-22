import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const supabase = createClient();
  const url = new URL(req.url);
  const knowhowId = url.pathname.split("/").pop();

  try {
    if (knowhowId) {
      const { data: comments, error: commentError } = await supabase
        .from("knowhow_comments")
        .select(
          `
          *,
          users (nickname)
        `
        )
        .eq("knowhow_post_id", knowhowId);

      if (commentError) {
        throw new Error("댓글을 가져오지 못했습니다");
      }

      const commentsWithNickname = comments.map((comment) => {
        const { users, ...commentData } = comment;
        return {
          ...commentData,
          nickname: users?.nickname
        };
      });
      return NextResponse.json({ comments: commentsWithNickname || [] });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
