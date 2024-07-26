import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { knowhowId: string } }) => {
  const supabase = createClient();
  const knowhowId = params.knowhowId;

  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();
    if (userError) {
      throw new Error("사용자 정보를 가져오지 못했습니다.");
    }
    const userId = user?.id;

    if (knowhowId && userId) {
      const { count: likeCount, error: countError } = await supabase
        .from("knowhow_likes")
        .select("*", { count: "exact" })
        .eq("knowhow_post_id", knowhowId);

      if (countError) {
        throw new Error("좋아요 수를 가져오지 못했습니다");
      }

      const { data: userLike, error: userLikeError } = await supabase
        .from("knowhow_likes")
        .select("*")
        .eq("knowhow_post_id", knowhowId)
        .eq("user_id", userId)
        .single();

      if (userLikeError && userLikeError.code !== "PGRST116") {
        throw new Error("사용자의 좋아요 상태를 확인하지 못했습니다");
      }

      const isLiked = !!userLike;
      return NextResponse.json({ likeCount: likeCount ?? 0, isLiked });
    } else {
      return NextResponse.json({ error: "유효하지 않은 요청입니다" }, { status: 400 });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  const likeData = await req.json();

  try {
    if (likeData) {
      console.log(likeData);
      const { status, statusText, error } = await supabase.from("knowhow_likes").insert(likeData).single();

      if (error) {
        console.log(error);
        throw new Error("좋아요 업데이트에 실패했습니다.");
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

export const DELETE = async (req: NextRequest) => {
  const supabase = createClient();
  const likeData = await req.json();
  try {
    if (likeData) {
      const { knowhow_post_id, user_id } = likeData;
      console.log(likeData);
      if (!knowhow_post_id || !user_id) {
        throw new Error("필요한 데이터가 없습니다.");
      }

      const { status, statusText, error } = await supabase
        .from("knowhow_likes")
        .delete()
        .eq("knowhow_post_id", knowhow_post_id)
        .eq("user_id", user_id);

      if (error) {
        console.log(error);
        throw new Error("좋아요 업데이트에 실패했습니다.");
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
