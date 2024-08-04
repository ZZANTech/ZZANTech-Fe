import MyPostsContainer from "@/app/(main)/mypage/posts/_components/MyPostsContainer";
import { Suspense } from "react";

function PostsPage() {
  return (
    <main className="h-full mt-[63px]">
      <h1 className="ml-[11px] text-[28px] font-semibold leading-9">내가 쓴 글</h1>
      <Suspense>
        <MyPostsContainer />
      </Suspense>
    </main>
  );
}

export default PostsPage;
