"use client";
import { checkLevelName, checkLevelImageURL, checkLevel } from "@/app/(main)/mypage/_utils/checkLevel";
import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";

function LevelContainer() {
  const { user } = useUserContext();
  const { total_point = 0, badge_url = "" } = user || {};
  const levelName = checkLevelName(total_point);
  const levelImageURL = checkLevelImageURL(total_point);
  const level = checkLevel(total_point);
  return (
    <div className="">
      <div className="flex justify-between align-center mb-6">
        <p className="font-bold text-[#333333] leading-5">내 등급</p>
        <div className="flex gap-1">
          <div className="w-5 h-5">
            <Image src={"/icons/mypage/circular_question.png"} width={20} height={20} alt="circular_question" />
          </div>

          <Link href="/mypage/grade">
            <p className="text-sm underline text-gray-800">등급제 설명</p>
          </Link>
        </div>
      </div>

      <div className="flex gap-8 ">
        <div className="w-9 h-9">
          <Image src={levelImageURL} width={36} height={36} alt="badge" />
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm cursor-default font-semibold text-gray-900 bg-main px-2 py-1 rounded-lg">
            {level}
          </span>
          <p className="text-sm">{levelName}</p>
        </div>
      </div>
    </div>
  );
}

export default LevelContainer;
