import Link from "next/link";
import React from "react";

function OtherPostsContainer() {
  return (
    <div className="flex flex-row gap-5 justify-between">
      <div className="flex flex-row gap-5 justify-between">
        <div className="flex flex-row gap-2.5">
          <>🖤</>
          <p>좋아요 누른 글 확인하기</p>
        </div>
      </div>
      <Link href="/mypage/like">➡️</Link>
    </div>
  );
}

export default OtherPostsContainer;
