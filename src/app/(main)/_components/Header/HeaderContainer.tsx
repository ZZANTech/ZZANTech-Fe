"use client";

import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/provider/contexts/UserContext";
import { useRouter } from "next/navigation";
import NavCategory from "@/app/(main)/_components/Nav/NavCategory";
import { revalidateRoute } from "@/utils/revalidation";

function HeaderContainer() {
  const router = useRouter();
  const { user, logOut, isPending } = useUserContext();

  const handleLogout = async () => {
    await logOut();
    revalidateRoute("/", "layout");
  };

  const defaultBadgeUrl = "/badges/lv1.png";
  return (
    <header className="mx-auto my-5 flex flex-row items-center justify-between relative ">
      <div className="flex">
        <Link href={"/"} className="mr-10">
          <Image src={"/logos/mainLogo.png"} width={132} height={24} alt="mainLogo" />
        </Link>
        <NavCategory />
      </div>

      {isPending ? (
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
