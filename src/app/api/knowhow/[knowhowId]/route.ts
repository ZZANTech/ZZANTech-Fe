import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { TKnowhow } from "@/types/knowhow.type";

export async function GET(
  req: NextRequest,
  { params: { knowhowId } }: { params: { knowhowId: TKnowhow["knowhow_postId"] } }
) {
  const supabase = createClient();

  try {
    if (knowhowId) {
      const { data, error } = await supabase
        .from("knowhow_posts")
        .select(
          `
          *,
          users (nickname, badge_url)
        `
        )
        .eq("knowhow_postId", knowhowId)
        .single();

      if (error || !data) {
        throw new Error("게시글을 불러오지 못했습니다.");
      }

      const { users, ...postData } = data;

      const result = {
        ...postData,
        nickname: users?.nickname,
        badge_url: users?.badge_url
      };
      return NextResponse.json({ post: result });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: "알 수 없는 에러" }, { status: 500 });
  }
}

export const PATCH = async (req: NextRequest, { params }: { params: { knowhowId: string } }) => {
  const supabase = createClient();

  const knowhowId = params.knowhowId;
  const updatedKnowhow = await req.json();

  try {
    if (knowhowId && updatedKnowhow) {
      const { status, statusText, error } = await supabase
        .from("knowhow_posts")
        .update(updatedKnowhow)
        .eq("knowhow_postId", knowhowId);

      if (error) {
        throw new Error("게시글 수정에 실패했습니다.");
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

export const DELETE = async (req: NextRequest, { params }: { params: { knowhowId: string } }) => {
  const supabase = createClient();

  const knowhowId = params.knowhowId;
  try {
    if (knowhowId) {
      const { status, statusText, error } = await supabase
        .from("knowhow_posts")
        .delete()
        .eq("knowhow_postId", knowhowId);

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
