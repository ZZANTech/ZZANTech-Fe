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
      <section className="w-full h-[180px] p-5 bg-white flex flex-col justify-start items-start gap-2.5 relative mt-[60px] mb-6">
        <div className="self-stretch h-[140px] flex flex-col justify-start items-start gap-5">
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <h1 className="self-stretch h-[29px] text-gray-900 text-2xl font-semibold leading-[34px]">
              다른 사람의 소비를 구경하고 평가해요
            </h1>
            <p className="w-[495px] text-gray-900 text-base font-normal leading-normal">
              내 소비 내역을 공유하고 좋은 소비였는지 아쉬운 소비였는지 이야기해요
            </p>
          </div>
          <div className="absolute top-5 right-[129px]">
            <Image src="/icons/vote/vote_list_image.png" alt="vote list image" width={256} height={100} />
          </div>
          <DescriptionTagList tags={VOTE_TAG_LIST} />
        </div>
      </section>
      {children}
    </>
  );
}

export default VoteDescription;
