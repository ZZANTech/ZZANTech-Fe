import { TVote } from "@/types/vote.type";
import Link from "next/link";
import Image from "next/image";
import BlockedVoteItem from "@/app/(main)/boards/votes/_components/BlockedVoteItem";

type VoteItemProps = {
  vote: TVote;
  sortOrder?: string;
};

function VoteItem({ vote, sortOrder }: VoteItemProps) {
  const { vote_postId, image_url, title, nickname, votes_count, comments_count, is_banned } = vote;
  console.log(vote);
  return (
    <li className="w-full">
      <Link
        href={`/boards/votes/${vote_postId}?sortOrder=${sortOrder}`}
        className="w-full h-[374px] md:h-[310px] flex flex-col justify-start items-center transform transition-transform duration-300 ease-out hover:-translate-y-2 rounded-xl overflow-hidden shadow-lg"
      >
        {is_banned ? (
          <BlockedVoteItem />
        ) : (
          <>
            <div className="relative w-full h-[220px] md:h-[155px]">
              <Image
                className="object-cover"
                src={image_url}
                alt="게시글 이미지"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
            <div className="w-full flex flex-col justify-start items-start p-3 bg-ivory gap-2 flex-grow">
              <div className="text-black text-xl font-semibold leading-7 line-clamp-2 h-[59px]">{title}</div>
              <div className="text-gray-700 text-sm font-normal leading-tight">{nickname}</div>
            </div>
            <div className="w-full h-11 bg-gray-900 flex justify-start items-center gap-3 px-2">
              <div className="flex items-center">
                <div className="w-6 h-6 p-[3px] flex justify-center items-center">👀</div>
                <div className="flex items-center gap-0.5">
                  <div className="text-main text-[13px] font-semibold leading-[18px]">투표수</div>
                  <div className="text-main text-sm font-semibold leading-tight">{votes_count}</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 p-1 flex justify-center items-center">🔥</div>
                <div className="flex items-center gap-0.5">
                  <div className="text-point text-[13px] font-semibold leading-[18px]">댓글</div>
                  <div className="text-point text-sm font-semibold leading-tight">{comments_count}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </Link>
    </li>
  );
}

export default VoteItem;
