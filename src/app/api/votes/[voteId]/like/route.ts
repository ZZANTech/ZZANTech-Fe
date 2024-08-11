import { POINTS, REASONS, addPoints } from "@/utils/points";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { voteId: number } }) => {
  const supabase = createClient();
  const voteId = params.voteId;

  const accessToken = req.headers.get("authorization")?.replace("Bearer ", "") || "";
  const refreshToken = req.headers.get("x-refresh-token") || "";

  let userId: string | null = null;

  if (accessToken && refreshToken) {
    const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    if (sessionError) {
      console.error("세션 설정 오류:", sessionError);
    } else if (sessionData?.user) {
      userId = sessionData.user.id;
    }
  }

  try {
    if (voteId) {
      const [totalVoteResponse, upvoteResponse, downvoteResponse] = await Promise.all([
        supabase.from("vote_likes").select("vote_likeId", { count: "exact" }).eq("vote_post_id", voteId),
        supabase
          .from("vote_likes")
          .select("vote_likeId", { count: "exact" })
          .eq("vote_post_id", voteId)
          .eq("is_upvote", true),
        supabase
          .from("vote_likes")
          .select("vote_likeId", { count: "exact" })
          .eq("vote_post_id", voteId)
          .eq("is_upvote", false)
      ]);

      const totalVoteCount = totalVoteResponse.count || 0;
      const upvoteCount = upvoteResponse.count || 0;
      const downvoteCount = downvoteResponse.count || 0;

      let userLikeStatus: "up_vote" | "down_vote" | null = null;

      if (userId) {
        const { data: userLikeData, error: userLikeError } = await supabase
          .from("vote_likes")
          .select("is_upvote")
          .eq("vote_post_id", voteId)
          .eq("user_id", userId)
          .single();

        if (!userLikeError && userLikeData) {
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
    return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  try {
    const voteData = await req.json();

    if (!voteData) {
      return NextResponse.json({ error: "유효한 투표 데이터가 없습니다." }, { status: 400 });
    }

    const { data: existingVoteData, error: existingVoteError } = await supabase
      .from("vote_likes")
      .select("*")
      .eq("user_id", voteData.user_id)
      .eq("vote_post_id", voteData.vote_post_id)
      .single();

    if (existingVoteError && existingVoteError.code !== "PGRST116") {
      throw new Error("좋아요 기록을 가져오지 못했습니다.");
    }

    if (existingVoteData) {
      return NextResponse.json({ error: "이미 이 게시물에 좋아요를 눌렀습니다." }, { status: 400 });
    }

    const { status, statusText, error } = await supabase.from("vote_likes").insert(voteData).single();

    if (error) {
      throw new Error("투표 업데이트에 실패했습니다.");
    }

    if (voteData.is_upvote) {
      const { data: authorData, error: authorError } = await supabase
        .from("vote_posts")
        .select("user_id")
        .eq("vote_postId", voteData.vote_post_id)
        .single();

      if (authorError) {
        throw new Error("작성자 정보를 가져오지 못했습니다");
      }

      const authorId = authorData.user_id;
      if (authorId !== voteData.user_id) {
        await addPoints(authorId, POINTS.VOTE_LIKE, REASONS.VOTE_LIKE);
      }
    }

    return NextResponse.json({ status, statusText });
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
