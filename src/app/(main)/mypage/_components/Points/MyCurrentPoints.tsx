"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";

function MyCurrentPoints() {
  const { user } = useUserContext();

  return (
    <div className="w-full flex justify-between items-center mt-[120px] mb-12">
      <div className="w-[400px] flex-col gap-6">
        <div className="text-black text-xl font-semibold">현재 사용 가능한 포인트</div>
        <div className="flex items-center gap-3">
          <Image src={"/icons/mypage/coin.png"} width={52} height={52} alt="동전 이미지" />
          <div className="flex items-center gap-2">
            <div className="text-point text-[56px] font-semibold">{user?.current_point.toLocaleString()} P</div>
          </div>
        </div>
      </div>
      <div className="w-[222.08px] h-[179px] relative">
        <Image
          src={"/icons/mypage/shopping.png"}
          width={222}
          height={179}
          alt="물건을 고르는 이미지"
          className="absolute top-0 right-0"
        />
      </div>
    </div>
  );
}

export default MyCurrentPoints;
