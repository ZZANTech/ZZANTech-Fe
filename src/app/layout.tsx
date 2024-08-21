import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/provider/Providers";
import HeaderContainer from "@/app/(main)/_components/Header/HeaderContainer";
import ConditionalFooter from "@/app/(main)/_components/Footer/ConditionalFooter";
import { defaultOpenGraph } from "@/constants";

export const metadata: Metadata = {
  title: "ZZAN",
  description: "짠테크를 통해 스마트한 소비와 절약을 실현하세요!",
  icons: {
    icon: "/favicon.png",
    apple: "/icons/pwa/180.png"
  },
  manifest: "/manifest.json",
  keywords: ["zzan", "짠테크", "절약", "스마트 소비", "PWA"],
  authors: [
    {
      name: "ZZAN Team",
      url: "https://www.zzan-tech.com"
    }
  ],
  openGraph: defaultOpenGraph
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "main"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link
          rel="preload"
          href="/fonts/subset-Pretendard-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/subset-Pretendard-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/subset-Pretendard-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/subset-Pretendard-ExtraBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`flex flex-col min-h-screen`}>
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
