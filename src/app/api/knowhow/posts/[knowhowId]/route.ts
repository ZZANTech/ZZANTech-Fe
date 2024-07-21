import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();

  const url = new URL(req.url);
  const knowhowId = url.pathname.split("/").pop();

  try {
    const { data: post, error } = await supabase.from("tip_posts").select("*").eq("tip_post_id", knowhowId!).single();

    if (error || !post) {
      throw new Error("게시글을 불러오지 못했습니다.");
    }

    return NextResponse.json({ post });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
