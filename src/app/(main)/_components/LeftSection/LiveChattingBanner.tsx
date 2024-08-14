import Image from "next/image";
import Link from "next/link";
import React from "react";

function LiveChattingBanner() {
  return (
    <div>
      <h3 className="font-semibold mt-9 mb-[10px] text-xl flex">
        <Image src="/home/main_live_icon.svg" alt="chat icon" width={24} height={24} className="mr-2" />
        실시간 라이브 채팅에 참여하세요!
      </h3>
      <Link href="/chat">
        <div className="w-full h-[160px] bg-[url('/home/home_live_banner.svg')] bg-cover bg-left bg-no-repeat lg:bg-[url('/home/home_live_banner.svg')] rounded-xl mt-4">
          <div className="lg:flex lg:items-center lg:justify-end lg:h-full lg:mb-4 lg:pt-20 lg:pr-9 hidden">
            <button className="text-main font-semibold rounded-lg mr-3">ENTER</button>
            <Image src="/home/home_live_enter.svg" alt="enter" width={28} height={28} className="inline-block" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default LiveChattingBanner;
