"use client";
import { checkLevelName, checkLevelImageURL, checkLevel } from "@/app/(main)/mypage/_utils/checkLevel";
import { useUserContext } from "@/provider/contexts/UserContext";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

function LevelContainer() {
  const { user } = useUserContext();
  const { total_point = 0, badge_url = "" } = user || {};
  const levelName = checkLevelName(total_point);
  const levelImageURL = checkLevelImageURL(total_point);
  const level = checkLevel(total_point);

  return (
    <div className="">
      <div className="flex justify-between align-center mb-5">
        <p className="font-bold">내 등급</p>
        <div className="w-5 h-5">
          <Image src={"/icons/mypage/circular_question.png"} width={20} height={20} alt="circular_question" />
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-9 h-9">
          <Image src={levelImageURL} width={36} height={36} alt="badge" />
        </div>
        <button className="bg-main px-2 py-1 rounded-lg">{level}</button>
        <p className="text-sm">{levelName}</p>
      </div>
    </div>
  );
}

export default LevelContainer;
