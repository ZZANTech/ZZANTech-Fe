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

    const likeCountPromise = supabase
      .from("knowhow_likes")
      .select("*", { count: "exact" })
      .eq("knowhow_post_id", knowhowId);

    const userLikePromise = user
      ? supabase.from("knowhow_likes").select("*").eq("knowhow_post_id", knowhowId).eq("user_id", user.id).single()
      : Promise.resolve({ data: null, error: null });

    const [{ count: likeCount, error: likeCountError }, { data: userLike, error: userLikeError }] = await Promise.all([
      likeCountPromise,
      userLikePromise
    ]);

    if (likeCountError) {
      throw new Error("좋아요 수를 가져오지 못했습니다.");
    }

    if (user && userLikeError && userLikeError.code !== "PGRST116") {
      throw new Error("사용자의 좋아요 상태를 확인하지 못했습니다.");
    }

    const isLiked = user ? !!userLike : false;

    return NextResponse.json({ likeCount: likeCount ?? 0, isLiked });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
    }
  }
};

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  const likeData = await req.json();

  try {
    if (likeData) {
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
