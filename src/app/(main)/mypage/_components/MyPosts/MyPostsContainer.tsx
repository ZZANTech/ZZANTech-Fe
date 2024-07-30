import Link from "next/link";
import React from "react";

function MyPostsContainer() {
  return (
    <div className="flex flex-row gap-5 justify-between">
      <p>
        <>✍🏻</>
        내가 쓴 글 확인하기
      </p>
      <Link href="/mypage/posts">➡️</Link>
    </div>
  );
}

export default MyPostsContainer;
