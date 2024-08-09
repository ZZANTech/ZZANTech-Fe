import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="flex justify-between border border-gray-400">
      <section>
        <Image src="/logos/mainLogo.png" alt="logo" width={100} height={100} />
        <div>
          <p>회사소개 | 이용약관 | 개인정보처리방침 | 청소년보호정책 | 제휴광고</p>
        </div>
        <p>Copyright ⓒ B-SEVEN ALL RIGHTS RESERVED.</p>
      </section>
      <section className="text-right">
        <p>짠 (ZZAN) 대표이사: 칠겅듀</p>
        <p>서울특별시 스파르타코딩클럽 REACT 사옥</p>
        <p>이메일: zzan_tech@naver.com</p>
        <div className="flex justify-end">
          <Image src="/home/linked.svg" alt="linked" width={24} height={24} />
          <Image src="/home/youtube.svg" alt="youTube" width={24} height={24} />
          <Image src="/home/github.svg" alt="github" width={24} height={24} />
          <Image src="/home/facebook.svg" alt="facebook" width={24} height={24} />
        </div>
      </section>
    </div>
  );
}

export default Footer;
