"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Button from "@/components/Button";

function NavUserStatusMoblie() {
  const { user, isPending } = useUserContext();

  if (isPending) {
    return null;
  }
  return (
    <div className="md:hidden flex items-center">
      {user ? (
        <Link href="/mypage" className="flex items-center">
          <Image src="/icons/home/my.svg" alt="마이페이지" width={25} height={25} />
        </Link>
      ) : (
        <Button variant="white" className="mr-2 w-[60px] h-7 p-0">
          로그인
        </Button>
      )}
    </div>
  );
}
export default NavUserStatusMoblie;
