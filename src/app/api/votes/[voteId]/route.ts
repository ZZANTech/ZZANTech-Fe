import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest, { params: { voteId } }: { params: { voteId: number } }) {
  const supabase = createClient();

  try {
    if (voteId) {
      const { data, error } = await supabase
        .from("vote_posts")
        .select(
          `
          *,
          users (nickname)
        `
        )
        .eq("vote_postId", voteId)
        .single();

      if (error || !data) {
        throw new Error("게시글을 불러오지 못했습니다.");
      }

      const { users, ...voteData } = data;

      const result = {
        ...voteData,
        nickname: users?.nickname
      };

      return NextResponse.json(result);
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: "알 수 없는 에러" }, { status: 500 });
  }
}
