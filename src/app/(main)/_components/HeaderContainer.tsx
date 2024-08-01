"use client";

import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/provider/contexts/UserContext";
import { useRouter } from "next/navigation";

function HeaderContainer() {
  const router = useRouter();
  const { user, logOut } = useUserContext();

  const handleLogout = () => {
    logOut();
    router.replace("/");
  };

  return (
    <div className="mx-auto my-5 flex flex-row border border-gray-100 gap-5 items-center justify-center">
      <Link href={"/"} className="w-[200px]">
        <Image src={"/logos/mainLogo.png"} width={132} height={24} alt="mainLogo" />
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
        <Link href={"/chat"} className="MainLinkButton">
          살까말까?LIVE
        </Link>
      </div>

      {user ? (
        <div className="flex flex-row gap-2.5">
          <Link href={"/mypage"} className="hover:font-bold hover:text-[#04B014]">
            {/* <p>badge</p> */}
            {user.nickname} 님
          </Link>
          <button onClick={handleLogout}>로그아웃</button>
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
