import LikedKnowhowContainer from "@/app/(main)/mypage/like/_components/LikedKnowhowContainer";
import { Suspense } from "react";

function LikedPostsPage() {
  return (
    <Suspense>
      <LikedKnowhowContainer />
    </Suspense>
  );
}

export default LikedPostsPage;
