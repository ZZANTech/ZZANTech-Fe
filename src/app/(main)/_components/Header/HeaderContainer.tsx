"use client";
import Image from "next/image";
import Link from "next/link";
import NavCategory from "@/app/(main)/_components/Nav/NavCategory";
import NavUserStatus from "@/app/(main)/_components/Nav/NavUserStatus";
import NavUserStatusMoblie from "@/app/(main)/_components/Nav/NavUserStatusMoblie";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import clsx from "clsx";
import { usePathname } from "next/navigation";

function HeaderContainer() {
  const pathname = usePathname();
  const { isWideScreen } = useIsWideScreen();
  const hideHeaderPaths = new Set(["/login", "/signup"]);
  const hideHeader = hideHeaderPaths.has(pathname);
  if (!isWideScreen && hideHeader) return null;

  return (
    <header className="mx-auto my-5 flex flex-row items-center justify-between relative">
      <div className="flex">
        <Link href="/" className="mr-10">
          <Image
            src={"/logos/mainLogo.png"}
            width={132}
            height={24}
            alt="mainLogo"
            className="w-[84px] h-auto md:w-[132px] lg:h-auto"
          />
        </Link>
        <NavCategory />
      </div>
      <NavUserStatus />
      <NavUserStatusMoblie />
    </header>
  );
}

export default HeaderContainer;
