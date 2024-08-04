import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { userId: string } }) => {
  const userId = params.userId;
  const supabase = createClient();
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "1");
  const offset = (page - 1) * limit;

  try {
    const { data: posts, error: postsError } = await supabase.rpc("get_my_votes", {
      limit_param: limit,
      offset_param: offset,
      user_id_param: userId
    });
    if (postsError) {
      throw new Error("게시글을 불러오지 못했습니다.");
    }

    const { count: totalItems, error: countError } = await supabase
      .from("vote_posts")
      .select("*", { count: "exact", head: true });

    if (countError) {
      throw new Error("전체 게시글 수를 불러오지 못했습니다.");
    }
    return NextResponse.json({ posts });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
