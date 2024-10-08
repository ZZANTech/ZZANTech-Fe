import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import "dayjs/locale/ko";
import clockIcon from "/public/icons/clock.svg";
import { TVote, TVoteLikeCountsResponse } from "@/types/vote.type";
import ActionNav from "@/app/(main)/boards/votes/[voteId]/_components/ActionNav";
import VoteButtons from "@/app/(main)/boards/votes/[voteId]/_components/VoteButtons";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type VoteContentProps = {
  vote: TVote;
  initialVoteLikes: TVoteLikeCountsResponse;
  accessToken: string;
  refreshToken: string;
};

function VoteContent({ vote, initialVoteLikes, accessToken, refreshToken }: VoteContentProps) {
  const { title, product_name, product_price, nickname, badge_url, created_at, image_url, vote_postId, content } = vote;
  const formattedCreatedAt = dayjs(created_at).fromNow();

  return (
    <div className="flex justify-center items-center w-full h-full px-0 md:px-4">
      <div className="flex flex-col w-full gap-5 md:max-w-[700px]">
        <div className="flex flex-col items-center w-full gap-5 md:gap-2 py-6 md:py-10 px-5 md:px-0 bg-ivory rounded-3xl">
          <div className="text-2xl font-semibold text-center text-basic w-full md:w-[480px]">{title}</div>
          <div className="flex flex-col items-center w-full md:w-[436px]">
            <div className="flex items-center justify-between w-full mb-2 md:mb-10 px-2 md:px-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex justify-center items-center relative aspect-square">
                  <Image className="object-cover" src={badge_url || ""} alt="profile" fill />
                </div>
                <div className="text-gray-800 text-sm font-normal leading-tight">{nickname}</div>
              </div>
              <div className="flex items-center gap-2">
                <Image src={clockIcon} alt="clock" width={20} height={20} />
                <div className="text-sm font-normal text-gray-800 text-right">{formattedCreatedAt}</div>
              </div>
            </div>
            <div className="relative w-full h-[191px] md:h-[300px] mb-3 md:mb-6 overflow-hidden rounded-xl group">
              <Image
                className="object-cover"
                src={image_url}
                alt="게시글 이미지"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.7),transparent_30%)] rounded-xl transition-opacity duration-300 group-hover:opacity-0"></div>
              <div className="absolute bottom-[11px] md:bottom-[18px] right-[15px] md:right-[29px] text-base font-normal text-white text-right transition-opacity duration-300 group-hover:opacity-0">
                <div>{product_name}</div>
                <div>{product_price.toLocaleString()} 원</div>
              </div>
            </div>
            <VoteButtons
              voteId={vote_postId}
              accessToken={accessToken}
              refreshToken={refreshToken}
              initialVoteLikes={initialVoteLikes}
            />
            <div className="mt-5 md:mt-[27px] text-base font-normal text-left text-[#090909] whitespace-pre-wrap w-full">
              {content}
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
