"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";

function MyCurrentPoints() {
  const { user } = useUserContext();

  return (
    <div className="w-full h-auto flex flex-col-reverse md:flex-row justify-between items-center mt-5 md:mt-[100px] mb-[26px] md:mb-12">
      <div className="flex flex-col items-center md:items-start gap-3 md:gap-6">
        <div className="text-black text-xl font-semibold">현재 사용 가능한 포인트</div>
        <div className="flex items-center gap-1 md:gap-3">
          <div className="relative w-[52px] h-[52px]">
            <Image src="/icons/mypage/coin.png" alt="동전 이미지" fill sizes="(max-width: 768px) 100vw, 52px" />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-point text-[40px] md:text-[56px] font-semibold">
              {user?.current_point.toLocaleString()} P
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 md:mb-0 relative w-[222px] h-[104px]">
        <Image src="/icons/mypage/cheering.png" alt="응원하는 티끌이" fill sizes="(max-width: 768px) 100vw, 222px" />
      </div>
    </div>
  );
}

export default MyCurrentPoints;
