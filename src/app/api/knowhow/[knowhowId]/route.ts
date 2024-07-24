import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest, { params: { knowhowId } }: { params: { knowhowId: number } }) {
  const supabase = createClient();

  try {
    if (knowhowId) {
      const { data, error } = await supabase
        .from("knowhow_posts")
        .select(
          `
          *,
          users (nickname)
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
        nickname: users?.nickname
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
  console.log(updatedKnowhow);
  console.log(knowhowId);
  try {
    if (knowhowId && updatedKnowhow) {
      const { status, statusText } = await supabase
        .from("knowhow_posts")
        .update(updatedKnowhow)
        .eq("knowhow_postId", knowhowId);
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
