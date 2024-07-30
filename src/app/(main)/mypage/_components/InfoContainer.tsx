"use client";

import { BASE_URL } from "@/constants";
import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";

function InfoContainer() {
  const { user } = useUserContext();
  // console.log("user", user);
  return (
    <div className="flex flex-row">
      <div className="flex flex-row gap-2.5">
        <Image src={user?.badge_url || ""} width={24} height={24} alt="mainLogo" />
        <p>{user?.nickname}님</p>
      </div>

      <div className="flex flex-row gap-2.5">
        <p>이메일 주소</p>
        <p>{user?.email}</p>
      </div>

      <Link href={`${BASE_URL}/mypage/edit`} className="bg-green-100">
        회원 정보 변경
      </Link>
    </div>
  );
}

export default InfoContainer;
