"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";

function PointContainer() {
  const { user } = useUserContext();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 justify-between">
        <div className="flex flex-row gap-5">
          <div>
            <p className="text-lg font-bold">현재 포인트</p>
            <div className="flex flex-row gap-2.5">
              <Image src={"/icons/mypage/diamond.png"} width={36} height={36} alt="diamond" />
              <p className="text-xl font-bold">P {user?.current_point}</p>
            </div>
          </div>
          <div>
            <p className="text-lg font-bold">누적 포인트</p>
            <p className="text-xl font-bold">P {user?.total_point}</p>
          </div>
        </div>

        <button className="bg-gray-300 rounded-lg text-sm p-2.5">
          <h1>기프티콘</h1>
          <h1>교환하기</h1>
        </button>
      </div>

      <p>포인트 3,000점이 넘으면 기프티콘으로 교환하실 수 있어요</p>
    </div>
  );
}

export default PointContainer;
