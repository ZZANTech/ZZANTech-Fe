import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { voteId: number } }) => {
  const supabase = createClient();
  const voteId = params.voteId;

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw new Error("사용자 정보를 가져오지 못했습니다.");
  }

  const user = userData?.user;
  const userId = user?.id;

  try {
    if (voteId && userId) {
      const { count: totalVoteCount, error: totalError } = await supabase
        .from("vote_likes")
        .select("*", { count: "exact" })
        .eq("vote_post_id", voteId);

      if (totalError) {
        throw new Error("전체 투표 수를 가져오지 못했습니다");
      }

      const { count: upvoteCount, error: upvoteError } = await supabase
        .from("vote_likes")
        .select("*", { count: "exact" })
        .eq("vote_post_id", voteId)
        .eq("is_upvote", true);

      if (upvoteError) {
        throw new Error("GOOD 투표 수를 가져오지 못했습니다");
      }

      const { count: downvoteCount, error: downvoteError } = await supabase
        .from("vote_likes")
        .select("*", { count: "exact" })
        .eq("vote_post_id", voteId)
        .eq("is_upvote", false);

      if (downvoteError) {
        throw new Error("BAD 투표 수를 가져오지 못했습니다");
      }

      let userLikeStatus = null;

      const { data: userLikeData, error: userLikeError } = await supabase
        .from("vote_likes")
        .select("is_upvote")
        .eq("vote_post_id", voteId)
        .eq("user_id", userId)
        .single();

      if (userLikeError) {
        throw new Error("사용자 투표 데이터를 가져오지 못했습니다");
      }

      userLikeStatus = userLikeData ? userLikeData.is_upvote : null;

      return NextResponse.json({
        totalVoteCount: totalVoteCount ?? 0,
        upvoteCount: upvoteCount ?? 0,
        downvoteCount: downvoteCount ?? 0,
        userLikeStatus: userLikeStatus
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
