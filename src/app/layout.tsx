import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/provider/Providers";
import HeaderContainer from "@/app/(main)/_components/HeaderContainer";
import Footer from "@/app/(main)/_components/Footer/Footer";

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
      <body className="flex flex-col min-h-screen">
        <Providers>
          <div className="flex-grow max-w-[1120px] w-full mx-auto">
            <HeaderContainer />
            {children}
          </div>
          <div className="w-full">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
