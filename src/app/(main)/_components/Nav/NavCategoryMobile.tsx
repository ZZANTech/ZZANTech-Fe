"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function NavCategoryMobile() {
  const pathname = usePathname();

  useEffect(() => {}, [pathname]);
  return (
    <>
      {/* 모바일 네비게이션 */}
      <nav className="text-xs fixed bottom-0 w-full bg-white p-4 flex justify-around border-t border-gray-200 lg:hidden z-10">
        <Link
          href="/"
          className={clsx("flex flex-col items-center", pathname === "/" ? "text-orange-500" : "text-gray-500")}
        >
          <Image
            src="/icons/home/home.svg"
            alt="짠-소비구경"
            width={24}
            height={24}
            className={clsx({ "filter-orange": pathname === "/" })}
          />
          <span className="mt-1">홈</span>
        </Link>
        <Link
          href="/boards/votes"
          className={clsx(
            "flex flex-col items-center",
            pathname === "/boards/votes" ? "text-orange-500" : "text-gray-500"
          )}
        >
          <Image
            src="/icons/home/view.svg"
            alt="짠-소비구경"
            width={24}
            height={24}
            className={clsx({ "filter-orange": pathname.startsWith("/boards/votes") })}
          />
          <span className="mt-1">짠소비구경</span>
        </Link>
        <Link
          href="/boards/knowhow"
          className={clsx(
            "flex flex-col items-center",
            pathname === "/boards/knowhow" ? "text-orange-500" : "text-gray-500"
          )}
        >
          <Image
            src="/icons/home/knowhow.svg"
            alt="짠-노하우"
            width={24}
            height={24}
            className={clsx({ "filter-orange": pathname.startsWith("/boards/knowhow") })}
          />
          <span className="mt-1">짠노하우</span>
        </Link>
        <Link
          href="/chat"
          className={clsx("flex flex-col items-center", pathname === "/chat" ? "text-orange-500" : "text-gray-500")}
        >
          <Image
            src="/icons/home/live.svg"
            alt="살까말까"
            width={24}
            height={24}
            className={clsx({ "filter-orange": pathname.startsWith("/chat") })}
          />
          <span className="mt-1">살까말까</span>
        </Link>
        <Link
          href="/exchange"
          className={clsx("flex flex-col items-center", pathname === "/exchange" ? "text-orange-500" : "text-gray-500")}
        >
          <Image
            src="/icons/home/point.svg"
            alt="포인트몰"
            width={24}
            height={24}
            className={clsx({ "filter-orange": pathname.startsWith("/exchange") })}
          />
          <span className="mt-1">포인트몰</span>
        </Link>
      </nav>
    </>
  );
}

export default NavCategoryMobile;
