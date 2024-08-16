"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";

function MyCurrentPoints() {
  const { user } = useUserContext();

  return (
    <div className="w-full px-5 h-[140px] flex justify-between items-center mt-[100px] mb-12">
      <div className="flex-col gap-6">
        <div className="text-black text-xl font-semibold">현재 사용 가능한 포인트</div>
        <div className="flex items-center gap-3">
          <Image src={"/icons/mypage/coin.png"} width={52} height={52} alt="동전 이미지" />
          <div className="flex items-center gap-2">
            <div className="text-point text-[56px] font-semibold">{user?.current_point.toLocaleString()} P</div>
          </div>
        </div>
      </div>
      <div>
        <Image src={"/icons/mypage/cheering.png"} width={222} height={104} alt="응원하는 티끌이" />
      </div>
    </div>
  );
}

export default MyCurrentPoints;
