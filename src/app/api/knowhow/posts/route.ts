import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = createClient();
  try {
    const { data: posts, error: postError } = await supabase.from("tip_posts").select("*");

    if (postError) {
      throw new Error("게시글을 불러오지 못했습니다.");
    }
    if (posts) {
      const postsWithUserInfo = await Promise.all(
        posts.map(async (post) => {
          console.log(post);
          const { data: user, error: userError } = await supabase
            .from("users")
            .select("nickname")
            .eq("user_id", post.user_id)
            .single();

          if (userError) {
            console.log(userError);
            throw new Error("작성자 정보를 불러오지 못했습니다.");
          }
          const { count: likesCount, error: likeError } = await supabase
            .from("tip_likes")
            .select("tip_post_id", { count: "exact", head: true })
            .eq("tip_post_id", post.tip_post_id);

          if (likeError) {
            throw new Error("좋아요 개수를 불러오지 못했습니다.");
          }

          const { count: commentsCount, error: commentError } = await supabase
            .from("tip_comments")
            .select("tip_post_id", { count: "exact", head: true })
            .eq("tip_post_id", post.tip_post_id);

          if (commentError) {
            throw new Error("댓글 개수를 불러오지 못했습니다");
          }

          return { ...post, nickname: user.nickname, likesCount, commentsCount };
        })
      );
      console.log(postsWithUserInfo);

      return NextResponse.json(postsWithUserInfo);
    }
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
