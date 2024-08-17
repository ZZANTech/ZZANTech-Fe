"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import NavCategoryMobile from "@/app/(main)/_components/Nav/NavCategoryMobile";

const Footer = dynamic(() => import("@/app/(main)/_components/Footer/Footer"), {
  loading: () => <div className="h-[124px]"></div>,
  ssr: false
});

const FooterWrapper = dynamic(() => import("@/app/(main)/_components/Footer/FooterWrapper"), {
  loading: () => <div className="h-[204px] mt-20"></div>,
  ssr: false
});

function ConditionalFooter() {
  const pathname = usePathname();

  const hideFooter = pathname === "/chat/1";

  if (hideFooter) return null;

  return (
    <>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
      <NavCategoryMobile />
    </>
  );
}
export default ConditionalFooter;
