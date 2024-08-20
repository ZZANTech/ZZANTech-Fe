"use client";
import { useEffect } from "react";
import Image from "next/image";
import detailSadTikkle from "/public/blocked/sad_tikkle-detail.png";
import { useRouter } from "next/navigation";
import useIsWideScreen from "@/hooks/useIsWideScreen";

function BlockedPost() {
  const router = useRouter();
  const { isWideScreen } = useIsWideScreen();

  useEffect(() => {
    if (!isWideScreen) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isWideScreen]);

  return (
    <section className="flex flex-col items-center scroll justify-center w-full h-[70vh] md:h-auto md:min-h-[calc(100dvh-400px)]">
      <div className="w-[261px] h-[162px] relative">
        <Image className="object-cover" src={detailSadTikkle} alt="슬퍼하는 티끌이" priority loading="eager" fill />
      </div>

      <p className="text-gray-900 text-xl font-semibold leading-7">관리자에 의해 규제된 게시글입니다</p>
      <span className="cursor-pointer text-xl font-semibold underline mt-4 leading-7 text-point" onClick={router.back}>
        뒤로가기
      </span>
    </section>
  );
}

export default BlockedPost;
