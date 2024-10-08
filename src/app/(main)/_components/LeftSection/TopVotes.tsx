"use client";

import SkeletonVotes from "@/app/(main)/_components/LeftSection/SkeletonVotes";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import useTopVotesQuery from "@/stores/queries/useTopVotesQuery";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function TopVotes() {
  const { isWideScreen } = useIsWideScreen();
  const { data, isPending } = useTopVotesQuery();

  if (!isWideScreen) {
    return (
      <div className="py-[10px]">
        <h3 className="text-xl font-semibold mt-4 lg:mt-14 mb-4 flex">
          <Image src="/home/crown.svg" alt="crown" width={24} height={24} className="mr-2" />
          이번주 소비왕
        </h3>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.5}
          spaceBetween={-30}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }}
          pagination={false}
          loop={true}
          initialSlide={3}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <SkeletonVotes />
                </SwiperSlide>
              ))
            : data?.map((vote) => (
                <SwiperSlide key={vote.vote_postId} className="transition duration-300 ease-in-out hover:scale-105">
                  <Link href={`/boards/votes/${vote.vote_postId}`}>
                    <div className="flex flex-col h-full">
                      <div className="relative w-full pb-[75%] overflow-hidden rounded-t-xl">
                        <Image
                          src={vote.image_url}
                          alt={vote.title}
                          fill
                          sizes="100vw"
                          priority
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 text-white w-full pl-4 pb-3">
                          <h6 className="font-semibold truncate">{vote.title}</h6>
                        </div>
                      </div>
                      <div className="flex justify-between bg-ivory bg-opacity-95 p-2 rounded-b-xl">
                        <p className="text-sm">{vote.nickname}</p>
                        <div className="flex items-center">
                          <Image src="/icons/eye.png" alt="eye" width={20} height={20} />
                          <p className="text-sm ml-3">{vote.votes_count}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    );
  }

  return (
    <div className="py-[10px]">
      <h3 className="text-xl font-semibold mt-4 lg:mt-14 mb-4 flex">
        <Image src="/home/crown.svg" alt="crown" width={24} height={24} className="mr-2" />
        이번주 소비왕
      </h3>
      <ul className="flex w-full justify-between space-x-3">
        {isPending
          ? Array.from({ length: 3 }).map((_, index) => (
              <li key={index} className="flex-1">
                <SkeletonVotes />
              </li>
            ))
          : data?.map((vote) => (
              <li key={vote.vote_postId} className="flex-1 transition duration-300 ease-in-out hover:scale-105">
                <Link href={`/boards/votes/${vote.vote_postId}`}>
                  <div className="flex flex-col h-full">
                    <div className="relative w-full pb-[75%] overflow-hidden rounded-xl">
                      <Image src={vote.image_url} alt={vote.title} fill sizes="100vw" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 text-white w-full pl-4 pb-3">
                        <h6 className="font-semibold">{vote.title}</h6>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="text-sm">{vote.nickname}</p>
                      <div className="flex items-center">
                        <Image src="/icons/eye.png" alt="eye" width={20} height={20} />
                        <p className="text-sm ml-3">{vote.votes_count}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default TopVotes;
