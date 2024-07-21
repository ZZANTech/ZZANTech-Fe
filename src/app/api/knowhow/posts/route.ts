import { SEARCH_AUTHOR, SEARCH_TITLECONTENT, SORT_LATEST, SORT_POPULAR } from "@/app/(main)/boards/knowhow/_constants";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const supabase = createClient();
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const sortOrder = url.searchParams.get("sortOrder") || SORT_LATEST;
  const selectedSearchOption = url.searchParams.get("searchOption") || SEARCH_TITLECONTENT;
  const searchKeyword = url.searchParams.get("search") || "";
  const offset = (page - 1) * limit;

  try {
    let baseQuery = supabase
      .from("tip_posts")
      .select("*", { count: "exact" })
      .order(sortOrder === SORT_POPULAR ? "likes_count" : "created_at", { ascending: false });

    if (selectedSearchOption === SEARCH_AUTHOR) {
      baseQuery = baseQuery.ilike("nickname", `%${searchKeyword}%`);
    } else if (selectedSearchOption === SEARCH_TITLECONTENT) {
      baseQuery = baseQuery.or(`title.ilike.%${searchKeyword}%,content.ilike.%${searchKeyword}%`);
    }

    const { data: posts, count: totalItems, error: postError } = await baseQuery.range(offset, offset + limit - 1);

    if (postError) {
      throw new Error("게시글을 불러오지 못했습니다.");
    }

    const postsArray = posts || [];

    const postsWithUserInfo = await Promise.all(
      postsArray.map(async (post) => {
        return post;
      })
    );

    return NextResponse.json({ posts: postsWithUserInfo, totalItems });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
