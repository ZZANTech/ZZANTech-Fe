"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function NavCategory() {
  const pathname = usePathname();

  useEffect(() => {}, [pathname]);

  return (
    <>
      {/* 데스크탑 네비게이션 */}
      <nav className="hidden md:flex flex-row items-center justify-center font-bold space-x-6">
        <Link
          href="/boards/votes"
          className={clsx("mainLinkButton", { mainLinkButtonActive: pathname.startsWith("/boards/votes") })}
        >
          짠-소비구경
        </Link>
        <Link
          href="/boards/knowhow"
          className={clsx("mainLinkButton", { mainLinkButtonActive: pathname.startsWith("/boards/knowhow") })}
        >
          짠-노하우
        </Link>
        <Link href="/chat" className={clsx("mainLinkButton", { mainLinkButtonActive: pathname.startsWith("/chat") })}>
          살까말까?LIVE
        </Link>
        <Link
          href="/exchange"
          className={clsx("mainLinkButton", { mainLinkButtonActive: pathname.startsWith("/exchange") })}
        >
          포인트샵
        </Link>
      </nav>
    </>
  );
}

export default NavCategory;
