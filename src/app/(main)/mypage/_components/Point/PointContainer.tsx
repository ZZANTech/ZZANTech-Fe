"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";

function PointContainer() {
  const { user } = useUserContext();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <div className="flex flex-row gap-5">
          <div>
            <p className="text-lg font-bold">현재 포인트</p>
            <div className="flex flex-row gap-2.5">
              <Image src={"/icons/fire.png"} width={24} height={24} alt="" />
              <p className="text-xl font-bold">{user?.current_point} 점</p>
            </div>
          </div>

          <div>
            <p className="text-lg font-bold">누적 포인트</p>
            <p className="text-xl font-bold">{user?.total_point} 점</p>
          </div>
        </div>

        <button className="bg-red-100">기프티콘 교환하기</button>
      </div>

      <p>포인트 3,000점이 넘으면 기프티콘으로 교환하실 수 있어요</p>
    </div>
  );
}

export default PointContainer;
