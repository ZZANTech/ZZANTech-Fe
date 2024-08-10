"use client";

import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/provider/contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function HeaderContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logOut, isLoading } = useUserContext();

  // useEffect(() => {
  //   console.log("Current pathname:", pathname);
  // }, [pathname]);

  const handleLogout = () => {
    logOut();
    router.replace("/");
  };
  const linkStyled = (path: string) => `MainLinkButton ${pathname.startsWith(path) ? "MainLinkButtonActive" : ""}`;

  const defaultBadgeUrl = "/badges/lv1.png";
  return (
    <header className="mx-auto my-5 flex flex-row items-center justify-between">
      <div className="flex">
        <Link href={"/"} className="mr-10">
          <Image src={"/logos/mainLogo.png"} width={132} height={24} alt="mainLogo" />
        </Link>

        <div className="flex flex-row items-center justify-center font-bold space-x-6">
          <Link href={"/boards/votes"} className={linkStyled("/boards/votes")}>
            짠-소비구경
          </Link>
          <Link href={"/boards/knowhow"} className={linkStyled("/boards/knowhow")}>
            짠-노하우
          </Link>
          <Link href={"/chat"} className={linkStyled("/chat")}>
            살까말까?LIVE
          </Link>
          <Link href={"/exchange"} className={linkStyled("/exchange")}>
            포인트샵
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center space-x-4">
          <div className="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
          <div className="w-16 h-8 bg-gray-300 animate-pulse rounded"></div>
        </div>
      ) : user ? (
        <div className="flex flex-row items-center">
          <Link href={"/mypage"} className="text-gray-800 flex">
            <Image src={user.badge_url || defaultBadgeUrl} alt="badge" width={24} height={24} className="mr-2" />
            {user.nickname} 님
          </Link>
          <button onClick={handleLogout} className="text-sm border border-[#111111] ml-4 mr-2 px-3 py-2 rounded">
            로그아웃
          </button>
        </div>
      ) : (
        <Link href={"/login"}>
          <button className="text-sm border border-[#111111] ml-4 mr-2 px-3 py-2 rounded">로그인</button>
        </Link>
      )}
    </header>
  );
}

export default HeaderContainer;
