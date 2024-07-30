"use client";
import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";

function LevelContainer() {
  const { user } = useUserContext();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <p className="text-lg font-bold">내 등급</p>
        <Image src={"/icons/mypage/circular_question.png"} width={20} height={20} alt="circular_question" />
      </div>

      <div className="flex flex-row gap-2.5">
        <Image src={user?.badge_url || ""} width={24} height={24} alt="bages" />
        <p>Lv 1 돈에 눈 뜬 새내기</p>
      </div>
    </div>
  );
}

export default LevelContainer;
