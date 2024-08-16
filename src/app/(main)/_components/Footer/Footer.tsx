import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="flex justify-between h-[124px]">
      <div className="max-w-[1120px] my-10 w-full mx-auto flex flex-col  md:flex-row justify-between items-start md:items-start">
        <section className="flex flex-col items-start">
          <Image src="/logos/footerLogo.svg" alt="logo" width={80} height={25} className="mb-4" />
          <div className="mb-10 flex space-x-3 text-sm text-gray-700">
            <Link href="/about">회사소개</Link>
            <span>|</span>
            <Link href="/terms">이용약관</Link>
            <span>|</span>
            <Link href="/privacy">개인정보처리방침</Link>
            <span>|</span>
            <Link href="/youth-protection">청소년보호정책</Link>
            <span>|</span>
            <Link href="/ads">제휴광고</Link>
          </div>
          <p className="text-sm text-grey-900">Copyright ⓒ B-SEVEN ALL RIGHTS RESERVED.</p>
        </section>
        <section className="text-sm flex flex-col md:items-end justify-start text-gray-700">
          <p>짠 (ZZAN) 대표이사: 칠겅듀</p>
          <p>서울특별시 스파르타코딩클럽 REACT 사옥</p>
          <p>이메일: zzan_tech@naver.com</p>
          <div className="flex md:justify-end gap-5 mt-10">
            <Image src="/home/linked.svg" alt="linked" width={24} height={24} />
            <Image src="/home/youtube.svg" alt="youTube" width={24} height={24} />
            <Image src="/home/github.svg" alt="github" width={24} height={24} />
            <Image src="/home/facebook.svg" alt="facebook" width={24} height={24} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Footer;
