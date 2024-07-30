import Image from "next/image";
import Link from "next/link";
import React from "react";

function MyPostsContainer() {
  return (
    <div className="flex flex-row gap-5 justify-between">
      <div className="flex flex-row gap-2.5">
        <Image src={"/icons/mypage/pencil.png"} width={24} height={24} alt="pencil" />
        <p>내가 쓴 글 확인하기</p>
      </div>

      <Link href="/mypage/posts">➡️</Link>
    </div>
  );
}

export default MyPostsContainer;
