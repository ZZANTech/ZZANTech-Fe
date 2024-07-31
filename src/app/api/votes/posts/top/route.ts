import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  try {
    const { data: posts, error: postsError } = await supabase.rpc("get_top_votes_with_fallback", {
      days: 7,
      limit_param: 3
    });

    if (postsError || !posts) {
      throw new Error("게시글을 불러오지 못했습니다.");
    }

    return NextResponse.json({ posts });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: "알 수 없는 에러" }, { status: 500 });
  }
}
