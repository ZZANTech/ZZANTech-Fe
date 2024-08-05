import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/provider/Providers";
import HeaderContainer from "@/app/(main)/_components/HeaderContainer";

export const metadata: Metadata = {
  title: "ZZAN",
  description: "짠테크를 통해 스마트한 소비와 절약을 실현하세요!",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body className="max-w-[1120px] pb-[100px] mx-auto">
        <Providers>
          <HeaderContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
