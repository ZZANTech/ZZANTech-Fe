"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function PointContainer() {
  const { user } = useUserContext();
  const router = useRouter();
  const total_point = user?.total_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const current_point = user?.current_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handlePointsHistoryClick = () => {
    router.push("/mypage/point");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex justify-between gap-12">
          <div className="flex flex-col gap-3">
            <p className="font-bold text-point leading-5">사용 가능 포인트</p>
            <div className="flex gap-2 items-center">
              <Image src={"/icons/mypage/coin.png"} width={36} height={36} alt="diamond" />
              <p className="text-2xl font-bold">{current_point || 0} P</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-bold text-[#333333] leading-5">누적 포인트</p>
            <p className="text-2xl font-bold text-[#8b8b8b]">{total_point || 0} P</p>
          </div>
        </div>

        <button
          onClick={handlePointsHistoryClick}
          className="flex items-center justify-center  w-[112px] h-10 px-4 py-3.5 text-sm font-semibold bg-[#111111] text-white rounded-md"
        >
          사용 내역
        </button>
      </div>
      <div className="flex justify-between ">
        <p className="text-sm text-[#1b1b1b]">포인트 3,000점이 넘으면 기프티콘으로 교환하실 수 있어요</p>
        <Link href={"/exchange"} className="text-sm font-semibold underline">
          교환하기
        </Link>
      </div>
    </div>
  );
}

export default PointContainer;
