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
        <Button className="ml-4 mr-2 px-3 py-2">로그인</Button>
      )}
    </div>
  );
}
export default NavUserStatusMoblie;
