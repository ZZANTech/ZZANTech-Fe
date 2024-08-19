import { ReactNode } from "react";
import Image from "next/image";
import DescriptionTagList from "@/app/(main)/boards/knowhow/_components/DescriptionTagList";

type VoteDescriptionProps = {
  children: ReactNode;
};

function VoteDescription({ children }: VoteDescriptionProps) {
  const VOTE_TAG_LIST = ["소비평가", "건강한", "소비습관"];

  return (
    <>
      <section className="relative w-full flex flex-col md:mt-[60px] mt-3 md:h-[180px] md:p-5 mb-6">
        {/* 데스크탑용 */}
        <div className="hidden md:flex h-35 gap-5 relative">
          <div className="flex flex-col gap-5 flex-grow">
            <div className="gap-2">
              <div className="text-gray-900 font-semibold text-2xl leading-[34px]">
                <h1 className="hidden md:block">다른 사람의 소비를 구경하고 평가해요</h1>
              </div>
              <div className="text-gray-900 font-normal text-base leading-normal">
                <p className="hidden md:block">내 소비 내역을 공유하고 좋은 소비였는지 아쉬운 소비였는지 이야기해요</p>
              </div>
            </div>
            <div>
              <DescriptionTagList tags={VOTE_TAG_LIST} />
            </div>
          </div>
          <div className="flex-shrink-0 self-start mt-[14px] mr-[109px]">
            <Image src="/icons/vote/vote_list_image.png" alt="소비 구경 이미지" width={256} height={100} priority />
          </div>
        </div>
        {/* 모바일용 */}
        <div className="md:hidden flex justify-start items-start py-3">
          <div className="flex flex-col gap-1">
            <div className="text-gray-900 text-xl font-semibold leading-7">짠 소비 구경</div>
            <div className="text-gray-500 text-sm">
              내 소비 내역을 공유하고 <br />
              좋은 소비였는지 아쉬운 소비였는지 이야기해요
            </div>
          </div>
          <div className="ml-auto self-end">
            <Image
              src="/icons/vote/vote_list_image_mobile.png"
              alt="소비 구경 이미지"
              width={78}
              height={59}
              className="block"
            />
          </div>
        </div>
      </section>
      {children}
    </>
  );
}

export default VoteDescription;
