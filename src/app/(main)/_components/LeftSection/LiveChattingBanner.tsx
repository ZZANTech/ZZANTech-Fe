import Image from "next/image";
import Link from "next/link";
import React from "react";

function LiveChattingBanner() {
  return (
    <div className="relative">
      <h3 className="font-semibold mt-9 mb-[10px] text-xl">실시간 라이브 채팅에 참여하세요! 💬</h3>
      <div>
        <Link href="/chat">
          <Image
            src="/home/home_live_banner.png"
            alt="join live chatting"
            width={700}
            height={300}
            className="object-cover"
          />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 translate-y-9">
              <Image
                src="/home/path-to-green-stripe.png"
                alt="green stripe"
                width={700}
                height={300}
                className="object-cover w-full h-auto"
              />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 text-white text-lg font-bold pr-14 pb-6 rounded-lg">
            참여하기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LiveChattingBanner;
