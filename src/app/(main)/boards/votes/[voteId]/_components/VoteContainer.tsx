import VoteButtons from "@/app/(main)/boards/votes/[voteId]/_components/VoteButtons";
import { TVote } from "@/types/vote.type";
import dayjs from "dayjs";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

function VoteContainer({ vote }: { vote: TVote }) {
  const formattedCreatedAt = dayjs(vote.created_at).fromNow();
  return (
    <>
      <div className="self-stretch flex flex-col justify-start items-center gap-2">
        <div className="w-[480px] flex justify-center">
          <div className="text-center text-basic text-2xl font-semibold">{vote.title}</div>
        </div>
        <div className="w-[480px] flex justify-between items-center">
          <div className="text-left text-gray-800 text-sm font-normal leading-tight">{vote.nickname}</div>
          <div className="text-right text-gray-800 text-sm font-normal leading-tight">{formattedCreatedAt}</div>
        </div>
      </div>
      <div className="w-[436px] flex flex-col justify-start items-center gap-8">
        <div className="w-full flex flex-col gap-6">
          <div className="relative w-full h-[300px] overflow-hidden">
            <Image src={vote.image_url} alt="게시글 이미지" className="rounded-xl object-cover" layout="fill" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-xl"></div>
            <div className="absolute bottom-4 right-8 text-right text-white text-base font-normal">
              <div>{vote.product_name}</div>
              <div>{vote.product_price} 원</div>
            </div>
          </div>
          <VoteButtons voteId={vote.vote_postId} />
        </div>
        <div className="self-stretch grow shrink basis-0 justify-start items-center gap-2.5 inline-flex">
          <div className="grow shrink basis-0 text-[#090909] text-base font-normal leading-normal">{vote.content}</div>
        </div>
      </div>
    </>
  );
}

export default VoteContainer;
