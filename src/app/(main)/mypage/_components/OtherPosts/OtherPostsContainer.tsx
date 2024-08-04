import Image from "next/image";
import Link from "next/link";
import React from "react";

function OtherPostsContainer() {
  return (
    <div className="flex flex-row gap-5 justify-between">
      <div className="flex flex-row gap-5 justify-between">
        <div className="flex flex-row gap-2.5">
          <div className="w-7 h-7">
            <Image src="/icons/mypage/heart.png" width={28} height={28} alt="heart" />
          </div>
          <p>좋아요 누른 글 확인하기</p>
        </div>
      </div>

      <Link href="/mypage/like" className="w-6 h-6">
        <Image src="/icons/mypage/right_arrow.png" width={24} height={24} alt="right_arrow" />
      </Link>
    </div>
  );
}

export default OtherPostsContainer;
