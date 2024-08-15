"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import { revalidateRoute } from "@/utils/revalidation";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Button from "@/components/Button";

function NavUserStatus() {
  const { user, logOut, isPending } = useUserContext();

  const handleLogout = async () => {
    await logOut();
    revalidateRoute("/", "layout");
  };

  const defaultBadgeUrl = "/badges/lv1.png";

  return (
    <div className="hidden md:flex items-center justify-between space-x-4">
      {isPending ? (
        <div className="flex items-center space-x-4 mr-2">
          <div className="w-24 h-6 bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="w-20 h-11 bg-gray-300 animate-pulse rounded-lg"></div>
        </div>
      ) : user ? (
        <div className="flex flex-row items-center">
          <Link href={"/mypage"} className="text-gray-800 text-sm flex">
            <Image src={user.badge_url || defaultBadgeUrl} alt="badge" width={24} height={24} className="mr-1" />
            {user.nickname} 님
          </Link>
          <Button variant="white" size="small" textSize="small" onClick={handleLogout} className="ml-4  mr-2">
            로그아웃
          </Button>
        </div>
      ) : (
        <Button variant="white" size="small" textSize="small" href="/login" className="mr-2">
          로그인
        </Button>
      )}
    </div>
  );
}

export default NavUserStatus;
