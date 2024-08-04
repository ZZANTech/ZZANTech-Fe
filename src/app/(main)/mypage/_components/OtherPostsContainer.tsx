import Image from "next/image";
import Link from "next/link";
import React from "react";
import heart from "/public/icons/mypage/heart.png";
import rightArrow from "/public/icons/mypage/right_arrow.png";

function OtherPostsContainer() {
  return (
    <Link href="/mypage/like">
      <div className="flex flex-row gap-5 justify-between">
        <div className="flex flex-row gap-2.5 items-center">
          <Image src={heart} width={28} height={28} alt="heart" />
          <p>좋아요 누른 글 확인하기</p>
        </div>
        <div className="w-6 h-6">
          <Image src={rightArrow} width={24} height={24} alt="right_arrow" />
        </div>
      </div>
    </Link>
  );
}

export default OtherPostsContainer;
