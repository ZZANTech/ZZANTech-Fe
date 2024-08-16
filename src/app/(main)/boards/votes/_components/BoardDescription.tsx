import Image from "next/image";
import { ReactNode } from "react";

type BoardDescriptionProps = {
  children: ReactNode;
};

function BoardDescription({ children }: BoardDescriptionProps) {
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
          <div className="justify-start items-center gap-2 inline-flex">
            <div className="px-2.5 py-1 border border-gray-900 justify-center items-center gap-2.5 flex">
              <div className="text-gray-900 text-base font-normal leading-normal">#소비평가</div>
            </div>
            <div className="px-2.5 py-1 border border-gray-900 justify-center items-center gap-2.5 flex">
              <div className="text-gray-900 text-base font-normal leading-normal">#건강한</div>
            </div>
            <div className="px-2.5 py-1 border border-gray-900 justify-center items-center gap-2.5 flex">
              <div className="text-gray-900 text-base font-normal leading-normal">#소비습관</div>
            </div>
          </div>
        </div>
      </section>
      {children}
    </>
  );
}

export default BoardDescription;
