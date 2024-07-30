import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: { userId } }: { params: { userId: Tables<"users">["userId"] } }
) => {
  const supabase = createClient();
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "2");
  const limit = parseInt(url.searchParams.get("limit") || "3");
  const offset = (page - 1) * limit;

  try {
    const { data: posts, error: postsError } = await supabase.rpc("get_my_knowhow_posts", {
      limit_param: limit,
      offset_param: offset,
      user_id_param: userId
    });
    if (postsError) {
      console.log(postsError);
      throw new Error("게시글을 불러오지 못했습니다.");
    }

    const { count: totalItems, error: countError } = await supabase
      .from("knowhow_posts")
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
