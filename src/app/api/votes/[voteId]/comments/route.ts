import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { voteId: string } }) => {
  const supabase = createClient();
  const voteId = params.voteId;
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const offset = (page - 1) * pageSize;

  try {
    if (voteId) {
      const { data: comments, error: commentError } = await supabase
        .from("vote_comments")
        .select(
          `
          *,
          users (nickname, badge_url)
        `
        )
        .eq("vote_post_id", voteId)
        .order("created_at", { ascending: false })
        .range(offset, offset + pageSize - 1);

      const { count: totalCommentsCount, error: totalCommentsCountsError } = await supabase
        .from("vote_comments")
        .select("vote_commentId", { count: "exact" })
        .eq("vote_post_id", voteId);

      if (commentError) {
        throw new Error("댓글을 가져오지 못했습니다");
      }
      if (totalCommentsCountsError) {
        throw new Error("댓글 개수를 가져오지 못했습니다");
      }

      const commentsWithNicknameAndBadge = comments.map((comment) => {
        const { users, ...commentData } = comment;
        return {
          ...commentData,
          nickname: users?.nickname,
          badge_url: users?.badge_url
        };
      });

      return NextResponse.json({
        comments: commentsWithNicknameAndBadge || [],
        totalCommentsCount: totalCommentsCount || 0
      });
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

export const POST = async (req: NextRequest, { params }: { params: { voteId: string } }) => {
  const supabase = createClient();
  const voteId = params.voteId;
  const newComment = await req.json();

  try {
    if (voteId) {
      const { status, statusText, error } = await supabase
        .from("vote_comments")
        .insert({ ...newComment, vote_post_id: voteId })
        .single();

      if (error) {
        throw new Error("댓글 작성에 실패했습니다");
      }

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
