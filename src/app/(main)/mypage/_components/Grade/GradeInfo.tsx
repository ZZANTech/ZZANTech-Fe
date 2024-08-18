import Button from "@/components/Button/Button";
import Image from "next/image";
import React from "react";

type GradeInfoProps = {
  onClose: () => void;
};

function GradeInfo({ onClose }: GradeInfoProps) {
  const levels = [
    { level: "레벨 1", badge: "/badges/lv1.png", name: "새내기 짠테커", points: "0p" },
    { level: "레벨 2", badge: "/badges/lv2.png", name: "초보 짠테커", points: "15P" },
    { level: "레벨 3", badge: "/badges/lv3.png", name: "고수 짠테커", points: "1000P" },
    { level: "레벨 4", badge: "/badges/lv4.png", name: "마스터 짠테커", points: "5000P" },
    { level: "레벨 5", badge: "/badges/lv5.png", name: "슈퍼마스터 짠테커", points: "10000P" }
  ];

  const pointMethods = [
    { text: "짠 노하우 글 작성 시 100p 획득", icon: "/icons/mypage/green_twinkle.png" },
    { text: "오늘의 퀴즈 정답 시 50p 오답 시 10p 획득", icon: "/icons/mypage/green_twinkle.png" },
    { text: "짠 소비구경 글 작성 후 좋아요 10개당 10p 획득", icon: "/icons/mypage/green_twinkle.png" }
  ];

  return (
    <div className="p-10">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-3">등급제란?</h3>
        <p className="text-sm text-center mb-6">
          짠테커에서는 다섯 등급에 따라 뱃지가 부여됩니다.
          <br /> 등급을 올리기 위해서는 일정 포인트가 필요합니다.
          <br />
          누적 포인트가 <span className="text-point">3000P</span>가 되면 기프티콘을 구매할 수 있습니다
        </p>
      </div>
      <div className="mb-11">
        <div className="flex mb-2">
          <div className="font-semibold pl-6">레벨</div>
          <div className="font-semibold pl-11">뱃지</div>
          <div className="font-semibold pl-12">등급명</div>
          <div className="font-semibold pl-20">달성 포인트</div>
        </div>
        {levels.map((level, index) => (
          <div key={index} className="flex mb-2 pl-3 items-center">
            <div className="w-12 h-7 bg-main text-sm font-semibold leading-tight rounded-lg flex justify-center items-center">
              {level.level}
            </div>
            <div className="pl-7">
              <Image src={level.badge} alt={level.name} width={36} height={36} />
            </div>
            <div className="pl-6 flex-1 text-[##262626]">{level.name}</div>
            <div className="w-14 text-left mr-4 text-[##262626]">{level.points}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mb-16">
        <h3 className="text-xl font-semibold mb-4">포인트 모으는 방법</h3>
        <p className="text-center text-sm mb-6">
          하루에 모을 수 있는 포인트는 <span className="text-point">최대 50P </span>입니다.
        </p>
        <ul>
          {pointMethods.map((method, index) => (
            <li key={index} className="flex items-center mb-2">
              <Image src={method.icon} alt="icon" width={24} height={24} className="mr-2" />
              <p className="text-sm">{method.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <Button onClick={onClose} variant="black" fullWidth={true} size="large">
          확인
        </Button>
      </div>
    </div>
  );
}

export default GradeInfo;
