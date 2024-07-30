"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderMiddle from "@/app/(main)/_components/HeaderMiddle";
import { useUserContext } from "@/provider/contexts/UserContext";
import { logout } from "@/apis/auth/authentication";
import { useState } from "react";

function HeaderContainer() {
  const [loading, setLoading] = useState(false);

  const { user } = useUserContext();

  return (
    <div className="mx-auto my-5 flex flex-row border border-gray-100 gap-5 items-center justify-center">
      <Link href={"/"} className="w-[200px]">
        <Image src={"/logos/mainLogo.png"} width={132} height={24} alt="mainLogo" />
      </Link>
      <HeaderMiddle />
      {user ? (
        <div className="flex flex-row gap-2.5">
          <Link href={"/mypage"} className="hover:font-bold hover:text-[#04B014]">
            {/* <p>badge</p> */}
            {user.nickname} 님
          </Link>
          <button onClick={logout}>로그아웃</button>
        </div>
      ) : (
        <Link href={"/login"} className="MainLinkButton">
          로그인
        </Link>
      )}
    </div>
  );
}

export default HeaderContainer;
