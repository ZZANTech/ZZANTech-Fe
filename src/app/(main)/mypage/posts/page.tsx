import MyPostsContainer from "@/app/(main)/mypage/posts/_components/MyPostsContainer";
import MobileHeader from "@/components/MobileHeader";
import { Suspense } from "react";

function PostsPage() {
  return (
    <main className="h-full md:mt-[63px]">
      <MobileHeader title="내가 쓴 글" />
      <h1 className="hidden md:block ml-[11px] text-[28px] font-semibold leading-9">내가 쓴 글</h1>
      <Suspense>
        <MyPostsContainer />
      </Suspense>
    </main>
  );
}

export default PostsPage;
