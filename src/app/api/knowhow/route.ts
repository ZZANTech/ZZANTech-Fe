import { SEARCH_TITLECONTENT, SORT_LATEST, SORT_POPULAR } from "@/app/(main)/boards/knowhow/_constants";
import { checkAndAddPoints } from "@/utils/checkPoints";
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
    const { data: posts, error: postsError } = await supabase.rpc("get_knowhow_posts", {
      limit_param: limit,
      offset_param: offset,
      search_option: selectedSearchOption,
      search_keyword: searchKeyword,
      sort_order: sortOrder
    });
    if (postsError) {
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

export const POST = async (req: Request) => {
  const supabase = createClient();
  const newKnowhow = await req.json();

  try {
    const { status, statusText, error } = await supabase.from("knowhow_posts").insert(newKnowhow).single();
    if (error) {
      throw new Error("게시글 작성에 실패했습니다");
    }

    const POINTS_TO_ADD = 10; // 항목별 포인트와 이유는 한곳에 모아두면 좋을듯 함
    const REASON_FOR_ADD_POINTS = "짠 노하우 게시글 작성";

    checkAndAddPoints(newKnowhow.user_id, POINTS_TO_ADD, REASON_FOR_ADD_POINTS).catch((e) => {
      console.error(e);
    });

    return NextResponse.json({ status, statusText });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
