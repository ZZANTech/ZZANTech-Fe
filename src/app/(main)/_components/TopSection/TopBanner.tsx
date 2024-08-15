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
    <div className="lg:w-[700px] w-full h-[260px] lg:h-[250px] z-0">
      <Swiper
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active"
        }}
        // autoplay={{
        //   delay: 2000,
        //   disableOnInteraction: false
        // }}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-full rounded-xl lg:py-0"
        style={{ height: "100%" }}
      >
        <SwiperSlide className="flex items-center justify-center h-full relative">
          <Link href="/exchange">
            <Image
              src="/home/home_banner.svg"
              alt="banner"
              fill
              className="object-cover hidden lg:block"
              loading="eager"
              quality={50}
            />
          </Link>
          <Link href="/exchange">
            <Image
              src="/home/banner_mobile.svg"
              alt="banner"
              fill
              className="object-cover lg:hidden"
              loading="eager"
              quality={50}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide className="bg-orange-500 flex items-center justify-center h-full">
          <div className="text-white text-xl h-full flex items-center justify-center">Slide 2</div>
        </SwiperSlide>
        <SwiperSlide className="bg-blue-300 flex items-center justify-center h-full">
          <div className="text-white text-xl h-full flex items-center justify-center">Slide 3</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default TopBanner;
