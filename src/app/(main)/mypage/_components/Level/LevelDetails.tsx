import Image from "next/image";
import React from "react";

function LevelDetails() {
  return (
    <div className="flex flex-row gap-2.5">
      <Image src={"/badges/lv5.png"} width={24} height={24} alt="bages" />
      <p>Lv 1 돈에 눈 뜬 새내기</p>
    </div>
  );
}

export default LevelDetails;
