"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "@/app/globals.css";
import { Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

function TopBanner() {
  return (
    <div className=" lg:w-[700px] z-0">
      <Swiper
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active"
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper py-20 h-full bg-orange-500 rounded-xl lg:py-0"
      >
        <SwiperSlide>
          <Link href="/exchange">
            <Image src="/home/home_banner.png" alt="home banner" width={700} height={250} className="w-full" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/exchange">
            <Image src="/home/home_banner.png" alt="home banner" width={700} height={250} className="w-full" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
}

export default TopBanner;
