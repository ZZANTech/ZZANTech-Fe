"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import HeaderMiddle from "@/app/(main)/_components/HeaderMiddle";
import HeaderRightUser from "@/app/(main)/_components/HeaderRightUser";
import HeaderRightNone from "@/app/(main)/_components/HeaderRightNone";
import { useUserContext } from "@/provider/contexts/UserContext";

function HeaderContainer() {
  const { user } = useUserContext();
  console.log("HeaderContainer user >>", user);
  return (
    <div className="mx-auto my-5 flex flex-row border border-gray-100 gap-5 items-center justify-center">
      <Link href={"/"} className="w-[200px]">
        <Image src={"/logos/mainLogo"} width={132} height={24} alt="mainLogo" />
      </Link>
      <HeaderMiddle />
      {user ? <HeaderRightUser /> : <HeaderRightNone />}
    </div>
  );
}

export default HeaderContainer;
