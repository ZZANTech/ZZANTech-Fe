import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/provider/Providers";
import HeaderContainer from "@/app/(main)/_components/Header/HeaderContainer";
import ConditionalFooter from "@/app/(main)/_components/Footer/ConditionalFooter";

const pretendard = localFont({
  src: [
    {
      path: "./assets/fonts/PretendardVariable.woff2",
      weight: "45 920"
    }
    // {
    //   path: "./assets/fonts/PretendardVariable.ttf",
    //   weight: "45 920"
    // }
  ],
  display: "swap",
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "ZZAN",
  description: "짠테크를 통해 스마트한 소비와 절약을 실현하세요!",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body className={`${pretendard.variable} font-pretendard flex flex-col min-h-screen`}>
        <Providers>
          <div className="flex-grow max-w-[1120px] w-full mx-auto px-5 lg:px-0">
            <HeaderContainer />
            {children}
          </div>
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
