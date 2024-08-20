import GradeTitleMobile from "@/app/(main)/mypage/_components/Grade/GradeTitleMobile";
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
    <div className="px-5 lg:p-10">
      <div className="flex flex-col items-center">
        <GradeTitleMobile />
        <h3 className="text-xl font-semibold mb-3 hidden lg:block">등급제란?</h3>
        <p className="text-sm text-center lg:mb-6">
          짠테커에서는 다섯 등급에 따라 뱃지가 부여됩니다.
          <br /> 등급을 올리기 위해서는 일정 포인트가 필요합니다.
          <br />
          누적 포인트가 <span className="text-point">1800P</span>가 되면 기프티콘을 구매할 수 있습니다
        </p>
      </div>
      <table className="min-w-full border-collapse mb-8 lg:mb-11">
        <thead>
          <tr className="border-b border-b-gray-900">
            <th className="text-left pl-3 py-2">레벨</th>
            <th className="text-left pl-1">뱃지</th>
            <th className="text-left lg:pl-10 pl-16">등급명</th>
            <th className="text-left">달성 포인트</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">
                <div className="flex items-center justify-center bg-main text-black font-semibold text-sm rounded-lg w-12 h-7">
                  {level.level}
                </div>
              </td>
              <td className="py-2 text-center">
                <Image src={level.badge} alt={level.name} width={36} height={36} />
              </td>
              <td className="py-2 text-left lg:pl-3 pl-14">{level.name}</td>
              <td className="py-2 text-left pl-4">{level.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-4">포인트 모으는 방법</h3>
        <p className="text-center text-sm mb-6">
          하루에 모을 수 있는 포인트는 <span className="text-point">최대 1000P </span>입니다.
        </p>
        <ul>
          {pointMethods.map((method, index) => (
            <li key={index} className="flex items-center lg:mb-2">
              <Image src={method.icon} alt="icon" width={24} height={24} className="mr-2" />
              <p className="text-sm">{method.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-8 lg:mt-12">
        <Button onClick={onClose} variant="black" fullWidth={true} size="large">
          확인
        </Button>
      </div>
    </div>
  );
}

export default GradeInfo;
