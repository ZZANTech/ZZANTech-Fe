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
    <div className="my-8">
      <div className="flex">
        <div className="flex">
          <div className="">
            <p className="text-base font-bold color-gray-800 mb-4">현재 포인트</p>
            <div className="flex mr-[66px]">
              <Image src={"/icons/mypage/diamond.png"} width={36} height={36} alt="diamond" />
              <p className="ml-2 text-2xl font-bold text-[#999999]">P {user?.current_point}</p>
            </div>
          </div>
          <div>
            <p className="text-base font-bold color-gray-800 mb-4">누적 포인트</p>
            <p className="text-2xl font-bold text-[#999999]">P {user?.total_point}</p>
          </div>
        </div>

        <button
          onClick={handlePointsHistoryClick}
          className="w-[112px] ml-[174px] px-4 py-[10px] rounded-md bg-gray-200 font-semibold text-sm text-[#999999]"
        >
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
