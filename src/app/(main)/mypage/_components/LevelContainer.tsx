"use client";
import { checkLevelName, checkLevelImageURL } from "@/app/(main)/mypage/_utils/checkLevel";
import { useUserContext } from "@/provider/contexts/UserContext";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

function LevelContainer() {
  const { user } = useUserContext();
  const { total_point = 0, badge_url = "" } = user || {};
  const levelName = checkLevelName(total_point);
  const LevelImageURL = checkLevelImageURL(total_point);

  return (
    <div className="">
      <div className="flex justify-between">
        <p className="font-bold">내 등급</p>
        <div className="w-5 h-5">
          <Image src={"/icons/mypage/circular_question.png"} width={20} height={20} alt="circular_question" />
        </div>
      </div>

      <div className="flex mt-5">
        <div className="w-9 h-9">
          <Image src={LevelImageURL} width={36} height={36} alt="badge" />
        </div>
        <p className="px-[10px] py-4 w-[97px] h-[44pt] bg-[#F5FFC5] rounded-[45px] ml-5">{levelName}</p>
      </div>
    </div>
  );
}

export default LevelContainer;
