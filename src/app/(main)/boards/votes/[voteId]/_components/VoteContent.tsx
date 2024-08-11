import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import "dayjs/locale/ko";
import { TVote, TVoteLikeCountsResponse } from "@/types/vote.type";
import ActionNav from "@/app/(main)/boards/votes/[voteId]/_components/ActionNav";
import VoteButtons from "@/app/(main)/boards/votes/[voteId]/_components/VoteButtons";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type VoteContentProps = {
  vote: TVote;
  voteLikes: TVoteLikeCountsResponse;
};

function VoteContent({ vote, voteLikes }: VoteContentProps) {
  const { title, product_name, product_price, nickname, created_at, image_url, vote_postId, content } = vote;
  const formattedCreatedAt = dayjs(created_at).fromNow();

  return (
    <div className="flex justify-center items-center w-full h-full gap-7">
      <div className="flex flex-col gap-[20px]">
        <div className="w-[700px] py-10 bg-ivory rounded-3xl flex-col justify-start items-center gap-10 flex">
          <div className="self-stretch flex flex-col justify-start items-center gap-2">
            <div className="w-[480px] flex justify-center">
              <div className="text-center text-basic text-2xl font-semibold">{title}</div>
            </div>
            <div className="w-[480px] flex justify-between items-center">
              <div className="text-left text-gray-800 text-sm font-normal leading-tight">{nickname}</div>
              <div className="text-right text-gray-800 text-sm font-normal leading-tight">{formattedCreatedAt}</div>
            </div>
          </div>
          <div className="w-[436px] flex flex-col justify-start items-center gap-8">
            <div className="w-full flex flex-col gap-6">
              <div className="relative w-full h-[300px] overflow-hidden group">
                <Image src={image_url} alt="게시글 이미지" className="rounded-xl object-cover" layout="fill" />
                <div className="transition-opacity duration-300 absolute inset-0 rounded-xl group-hover:opacity-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.7),transparent_30%)]"></div>
                <div className="absolute bottom-4 right-[20px] text-right text-white text-base font-normal transition-opacity duration-300 group-hover:opacity-0">
                  <div>{product_name}</div>
                  <div>{product_price.toLocaleString()} 원</div>
                </div>
              </div>
              <VoteButtons voteId={vote_postId} voteLikes={voteLikes} />
            </div>
            <div className="self-stretch grow shrink basis-0 justify-start items-center gap-2.5 inline-flex">
              <div className="grow shrink basis-0 text-[#090909] text-base font-normal leading-normal whitespace-pre-wrap">
                {content}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <ActionNav vote={vote} />
        </div>
      </div>
    </div>
  );
}

export default VoteContent;
