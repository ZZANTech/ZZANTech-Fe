"use client";
import InfoLeft from "@/app/(main)/mypage/_components/Info/InfoLeft";
import InfoRight from "@/app/(main)/mypage/_components/Info/InfoRight";

function InfoContainer() {
  return (
    <div className="flex flex-row">
      <InfoLeft />
      <InfoRight />
    </div>
  );
}

export default InfoContainer;
