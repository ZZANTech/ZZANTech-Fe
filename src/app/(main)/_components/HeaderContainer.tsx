"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import myprofileLogo from "@/assets/myprofileLogo.png";
import { useUserContext } from "@/provider/contexts/userContext";

function HeaderContainer() {
  const { user } = useUserContext();
  console.log("HeaderContainer user >>", user);

  return (
    <div className="w-[1120px] mx-auto my-5 flex flex-row border border-gray-100 gap-5 items-center justify-center">
      <Link href={"/"} className="w-[200px]">
        <Image src={logo} width={132} height={24} alt="logo" />
      </Link>
      <div className="w-[700px] flex flex-row items-center justify-center">
        <Link href={"/"} className="MainLinkButton">
          홈
        </Link>
        <Link href={"/boards/votes"} className="MainLinkButton">
          짠-소비구경
        </Link>
        <Link href={"/boards/knowhow"} className="MainLinkButton">
          짠-노하우
        </Link>
        <Link href={"/"} className="MainLinkButton">
          살까말까?LIVE
        </Link>
      </div>
      <div className="w-[200px] flex flex-row-reverse items-center">
        {user ? (
          <Link href={"/mypage"} className="MainLinkButton flex flex-row gap-1">
            <p>마이프로필</p>
            <Image src={myprofileLogo} width={24} height={24} alt="logo" />
          </Link>
        ) : (
          <Link href={"/login"} className="MainLinkButton">
            로그인
          </Link>
        )}
      </div>
    </div>
  );
}

export default HeaderContainer;
