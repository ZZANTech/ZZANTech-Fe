"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";

function PointContainer() {
  const { user } = useUserContext();

  // 점수 천단위 콤마(,) 표시
  const current_point = user?.current_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const total_point = user?.total_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <div className="flex flex-row gap-5">
          <div>
            <p className="text-lg font-bold">현재 포인트</p>
            <div className="flex flex-row gap-2.5">
              <Image src={"/icons/mypage/diamond.png"} width={36} height={36} alt="diamond" />
              <p className="text-xl font-bold">P {current_point}</p>
            </div>
          </div>

          <div>
            <p className="text-lg font-bold">누적 포인트</p>
            <p className="text-xl font-bold">P {total_point}</p>
          </div>
        </div>

        <button className="bg-red-100">기프티콘 교환하기</button>
      </div>

      <p>포인트 3,000점이 넘으면 기프티콘으로 교환하실 수 있어요</p>
    </div>
  );
}

export default PointContainer;
