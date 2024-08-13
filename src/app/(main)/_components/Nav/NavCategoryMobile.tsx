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
      <nav className="text-xs fixed bottom-0 w-full bg-white p-4 flex justify-around border-t border-gray-200 md:hidden z-10">
        <Link href="/" className={clsx("flex flex-col items-center", { "text-orange-500": pathname === "/" })}>
          <Image
            src="/icons/home/home.svg"
            alt="짠-소비구경"
            width={24}
            height={24}
            className={clsx({ "filter-orange": pathname === "/" })}
          />
          <span>홈</span>
        </Link>
        <Link
          href="/boards/votes"
          className={clsx("flex flex-col items-center", { "text-orange-500": pathname.startsWith("/boards/votes") })}
        >
          <Image
            src="/icons/home/view.svg"
            alt="짠-소비구경"
            width={24}
            height={24}
            className={clsx({ "filter-orange": pathname.startsWith("/boards/votes") })}
          />
          <span>짠소비구경</span>
        </Link>
        <Link
          href="/boards/knowhow"
          className={clsx("flex flex-col items-center", { "text-orange-500": pathname.startsWith("/boards/knowhow") })}
        >
          <Image
            src="/icons/home/knowhow.svg"
            alt="짠-노하우"
            width={24}
            height={24}
            className={clsx({ "filter-orange": pathname.startsWith("/boards/knowhow") })}
          />
          <span>짠노하우</span>
        </Link>
        <Link
          href="/chat"
          className={clsx("flex flex-col items-center", { "text-orange-500": pathname.startsWith("/chat") })}
        >
          <Image
            src="/icons/home/live.svg"
            alt="살까말까"
            width={24}
            height={24}
            className={clsx({ "filter-orange": pathname.startsWith("/chat") })}
          />
          <span>살까말까</span>
        </Link>
        <Link
          href="/exchange"
          className={clsx("flex flex-col items-center", { "text-orange-500": pathname.startsWith("/exchange") })}
        >
          <Image
            src="/icons/home/my.svg"
            alt="마이페이지"
            width={24}
            height={24}
            className={clsx({ "filter-orange": pathname.startsWith("/exchange") })}
          />
          <span>마이페이지</span>
        </Link>
      </nav>
    </>
  );
}

export default NavCategoryMobile;
