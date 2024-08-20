import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { knowhowId: string } }) => {
  const supabase = createClient();
  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const offset = parseInt(url.searchParams.get("offset") || "0");

  try {
    const { data: posts, error } = await supabase.rpc("get_previous_knowhows", {
      knowhow_id: Number(params.knowhowId),
      limit_param: limit,
      offset_param: offset
    });

    if (error) {
      console.log(error);
      throw new Error("데이터를 가져오는 데 실패했습니다.");
    }

    const hasMore = posts?.length === limit;

    return NextResponse.json({
      posts,
      nextOffset: hasMore ? offset + limit : null,
      hasMore
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "알 수 없는 에러가 발생했습니다." },
      { status: 500 }
    );
  }
};
