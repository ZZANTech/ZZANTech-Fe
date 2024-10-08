"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import arrow from "/public/icons/mobile_header_arrow.svg";
import { useRouter } from "next/navigation";
import clsx from "clsx";

type MobileHeaderProps = {
  title: string;
  onClick?: () => void;
};

function MobileHeader({ title, onClick }: MobileHeaderProps) {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);

  const handleGoBack = () => router.back();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={clsx("h-14 flex items-center justify-center md:hidden", {
        "fixed top-0 left-0 right-0 z-30 bg-white w-full": isSticky,
        relative: !isSticky
      })}
    >
      <div className={clsx("absolute left-0 flex items-center", { "left-5": isSticky })}>
        <span onClick={onClick || handleGoBack} className="flex items-center cursor-pointer">
          <Image src={arrow} alt="뒤로가기" width={28} height={28} />
        </span>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 text-center">{title}</h2>
    </header>
  );
}

export default MobileHeader;
