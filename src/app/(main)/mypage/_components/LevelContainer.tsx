"use client";
import { checkLevel } from "@/app/(main)/mypage/_utils/checkLevel";
import { useUserContext } from "@/provider/contexts/UserContext";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

function LevelContainer() {
  const { user } = useUserContext();
  const { total_point = 0, badge_url = "" } = user || {};
  const levelName = checkLevel(total_point);

  return (
    <div className="my-7">
      <div className="flex justify-between">
        <p className="text-base font-bold color-gray-800 mb-4">내 등급</p>
        <div className="w-5 h-5">
          <Image src={"/icons/mypage/circular_question.png"} width={100} height={100} alt="circular_question" />
        </div>
      </div>

      <div className="flex mt-5">
        <div className="w-[30px] h-[30px]">
          <Image src={user?.badge_url || ""} width={50} height={50} alt="bages" />
        </div>
        <p className="px-[10px] py-4 w-[97px] h-[44pt] bg-[#F5FFC5] rounded-[45px] ml-5">{levelName}</p>
      </div>
    </div>
  );
}

export default LevelContainer;
