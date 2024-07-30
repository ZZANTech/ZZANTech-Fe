import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { voteId: number } }) => {
  const supabase = createClient();
  const voteId = params.voteId;

  const { data: userData, error: userError } = await supabase.auth.getUser();

  const user = userData?.user || null;
  const userId = user ? user.id : null;

  try {
    if (voteId) {
      const { count: totalVoteCount = 0, error: totalError } = await supabase
        .from("vote_likes")
        .select("*", { count: "exact" })
        .eq("vote_post_id", voteId);

      if (totalError) {
        throw new Error("전체 투표 수를 가져오지 못했습니다");
      }

      const { count: upvoteCount = 0, error: upvoteError } = await supabase
        .from("vote_likes")
        .select("*", { count: "exact" })
        .eq("vote_post_id", voteId)
        .eq("is_upvote", true);

      if (upvoteError) {
        throw new Error("GOOD 투표 수를 가져오지 못했습니다");
      }

      const { count: downvoteCount = 0, error: downvoteError } = await supabase
        .from("vote_likes")
        .select("*", { count: "exact" })
        .eq("vote_post_id", voteId)
        .eq("is_upvote", false);

      if (downvoteError) {
        throw new Error("BAD 투표 수를 가져오지 못했습니다");
      }

      let userLikeStatus = null;

      if (userId) {
        const { data: userLikeData, error: userLikeError } = await supabase
          .from("vote_likes")
          .select("is_upvote")
          .eq("vote_post_id", voteId)
          .eq("user_id", userId)
          .single();

        if (userLikeError && userLikeError.details !== "The result contains 0 rows") {
          throw new Error("사용자 투표 데이터를 가져오지 못했습니다");
        }

        if (userLikeData) {
          userLikeStatus = userLikeData.is_upvote ? "up_vote" : "down_vote";
        }
      }

      return NextResponse.json({
        totalVoteCount,
        upvoteCount,
        downvoteCount,
        userLikeStatus
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

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  const voteData = await req.json();

  try {
    if (voteData) {
      const { status, statusText, error } = await supabase.from("vote_likes").insert(voteData).single();

      if (error) {
        throw new Error("투표 업데이트에 실패했습니다.");
      }

      return NextResponse.json({ status, statusText });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

export const PATCH = async (req: NextRequest) => {
  const supabase = createClient();

  const voteData = await req.json();

  try {
    if (voteData) {
      const { status, statusText, error } = await supabase
        .from("vote_likes")
        .update(voteData)
        .eq("vote_post_id", voteData.vote_post_id)
        .eq("user_id", voteData.user_id)
        .single();

      if (error) {
        throw new Error("투표 업데이트에 실패했습니다.");
      }

      return NextResponse.json({ status, statusText });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
