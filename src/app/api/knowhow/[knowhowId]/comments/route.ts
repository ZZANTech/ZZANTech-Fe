import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { knowhowId: string } }) => {
  const supabase = createClient();
  const knowhowId = params.knowhowId;

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
        .eq("knowhow_post_id", knowhowId)
        .order("created_at", { ascending: true });

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

export const POST = async (req: NextRequest, { params }: { params: { knowhowId: string } }) => {
  const supabase = createClient();
  const knowhowId = params.knowhowId;
  const newComment = await req.json();

  try {
    if (knowhowId) {
      const { status, statusText, error } = await supabase
        .from("knowhow_comments")
        .insert({ ...newComment, knowhow_post_id: knowhowId })
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
