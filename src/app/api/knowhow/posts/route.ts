import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  console.log("hello");
  const supabase = createClient();
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const sortOrder = url.searchParams.get("sortOrder") || "latest";
  console.log(sortOrder);
  const offset = (page - 1) * limit;

  try {
    const { data: posts, error: postError } = await supabase
      .from("tip_posts")
      .select("*")
      .order(sortOrder === "popular" ? "likes_count" : "created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (postError) {
      throw new Error("게시글을 불러오지 못했습니다.");
    }

    const { count: totalItems, error: countError } = await supabase
      .from("tip_posts")
      .select("*", { count: "exact", head: true });

    if (countError) {
      throw new Error("전체 게시글 수를 불러오지 못했습니다.");
    }

    const postsWithUserInfo = await Promise.all(
      posts.map(async (post) => {
        const { data: user, error: userError } = await supabase
          .from("users")
          .select("nickname")
          .eq("user_id", post.user_id)
          .single();

        if (userError) {
          throw new Error("작성자 정보를 불러오지 못했습니다.");
        }

        const { count: commentsCount, error: commentError } = await supabase
          .from("tip_comments")
          .select("tip_post_id", { count: "exact", head: true })
          .eq("tip_post_id", post.tip_post_id);

        if (commentError) {
          throw new Error("댓글 개수를 불러오지 못했습니다");
        }

        return { ...post, nickname: user.nickname || 0, commentsCount };
      })
    );

    return NextResponse.json({ posts: postsWithUserInfo, totalItems });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      console.error("알 수 없는 에러가 발생했습니다");
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
