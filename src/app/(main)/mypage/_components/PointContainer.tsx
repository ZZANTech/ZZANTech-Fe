"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

function PointContainer() {
  const { user } = useUserContext();
  const router = useRouter();

  const handlePointsHistoryClick = () => {
    router.push("/mypage/point");
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="flex ">
          <div className="">
            <p className="text-base font-bold color-gray-800 mb-4">현재 포인트</p>
            <div className="flex mr-[66px]">
              <Image
                src={"/icons/mypage/coin.png"}
                width={36}
                height={36}
                alt="diamond"
                style={{ width: "36px", height: "auto" }}
              />

              <p className="ml-2 text-2xl font-bold text-[#999999]">{user?.current_point}P</p>
            </div>
          </div>
          <div>
            <p className="text-base font-bold color-gray-800 mb-4">누적 포인트</p>
            <p className="text-2xl font-bold text-[#999999]">{user?.total_point}P</p>
          </div>
        </div>

        <button onClick={handlePointsHistoryClick} className="">
          포인트 내역
        </button>
      </div>

      <p className="mt-7 color-[#767676] text-base font-normal">
        포인트 3000점이 넘으면 기프티콘으로 교환하실 수 있어요
      </p>
    </div>
  );
}

export default PointContainer;
