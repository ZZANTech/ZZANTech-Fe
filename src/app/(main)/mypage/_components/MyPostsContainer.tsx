import Image from "next/image";
import Link from "next/link";
import React from "react";
import pencel from "/public/icons/mypage/pencil.png";
import rightArrow from "/public/icons/mypage/right_arrow.png";

function MyPostsContainer() {
  return (
    <Link href="/mypage/posts">
      <div className="flex flex-row gap-5 justify-between">
        <div className="flex flex-row gap-2.5 items-center">
          <Image src={pencel} width={28} height={28} alt="pencil" />
          <p>내가 쓴 글 확인하기</p>
        </div>
        <div className="w-6 h-6">
          <Image src={rightArrow} width={24} height={24} alt="right_arrow" />
        </div>
      </div>
    </Link>
  );
}

export default MyPostsContainer;
