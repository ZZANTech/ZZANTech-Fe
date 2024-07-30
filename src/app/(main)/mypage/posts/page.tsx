import MyPostsContainer from "@/app/(main)/mypage/posts/_components/MyPostsContainer";
import { Suspense } from "react";

function PostsPage() {
  return (
    <Suspense>
      <MyPostsContainer />
    </Suspense>
  );
}

export default PostsPage;
