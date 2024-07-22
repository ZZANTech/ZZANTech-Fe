import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();

  const url = new URL(req.url);
  const knowhowId = url.pathname.split("/").pop();

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
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
