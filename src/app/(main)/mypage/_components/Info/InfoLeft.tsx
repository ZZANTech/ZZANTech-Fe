"use Client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";

function InfoLeft() {
  const { user } = useUserContext();
  console.log("user", user);

  return (
    <div>
      <div className="flex flex-row gap-2.5">
        <Image src={"/badges/lv5.png"} width={24} height={24} alt="mainLogo" />
        <p>{user?.nickname}님</p>
      </div>

      <div className="flex flex-row gap-2.5">
        <p>이메일 주소</p>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}

export default InfoLeft;
