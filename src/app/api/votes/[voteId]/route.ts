import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest, { params: { voteId } }: { params: { voteId: string } }) {
  const supabase = createClient();
  const voteIdNumber = Number(voteId);

  try {
    const { data, error } = await supabase
      .from("vote_posts")
      .select(
        `
          *,
          users (nickname)
        `
      )
      .eq("vote_postId", voteIdNumber)
      .single();

    if (error || !data) {
      throw new Error("게시글을 불러오지 못했습니다.");
    }

    const { users, ...voteData } = data;

    const result = {
      ...voteData,
      nickname: users?.nickname
    };

    const { data: allVotes, error: navigationError } = await supabase
      .from("vote_posts")
      .select("vote_postId")
      .order("created_at", { ascending: false });

    if (navigationError || !allVotes) {
      throw new Error("네비게이션 데이터를 불러오지 못했습니다.");
    }

    const currentIndex = allVotes.findIndex((vote) => vote.vote_postId === voteIdNumber);
    let prevVoteId = currentIndex > 0 ? allVotes[currentIndex - 1].vote_postId : null;
    let nextVoteId = currentIndex < allVotes.length - 1 ? allVotes[currentIndex + 1].vote_postId : null;

    return NextResponse.json({ ...result, prevVoteId, nextVoteId });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: "알 수 없는 에러" }, { status: 500 });
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: { voteId: string } }) => {
  const supabase = createClient();
  const voteId = Number(params.voteId);
  const updatedVote = await req.json();

  try {
    if (voteId && updatedVote) {
      const { status, statusText } = await supabase.from("vote_posts").update(updatedVote).eq("vote_postId", voteId);

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

export const DELETE = async (req: NextRequest, { params }: { params: { voteId: string } }) => {
  const supabase = createClient();
  const voteId = Number(params.voteId);

  try {
    if (voteId) {
      const { status, statusText, error } = await supabase.from("vote_posts").delete().eq("vote_postId", voteId);

      if (error) {
        throw new Error("게시물 삭제에 실패했습니다");
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
