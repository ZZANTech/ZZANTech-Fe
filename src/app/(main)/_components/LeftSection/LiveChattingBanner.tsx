import Image from "next/image";
import Link from "next/link";
import React from "react";

function LiveChattingBanner() {
  return (
    <div className="relative">
      <h3 className="font-semibold mt-9 mb-[10px] text-xl">실시간 라이브 채팅에 참여하세요! 👑</h3>
      <Image
        src="/home/home_live_banner.png"
        alt="join live chatting"
        width={700}
        height={300}
        className="object-cover"
      />
      <Link href="/chat">
        <button className="absolute bottom-0 right-0 text-white text-lg font-bold pr-14 pb-6 rounded-lg">
          참여하기
        </button>
      </Link>
    </div>
  );
}

export default LiveChattingBanner;
