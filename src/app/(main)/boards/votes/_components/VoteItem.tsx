import { TVote } from "@/types/vote.type";
import Link from "next/link";
import Image from "next/image";

type voteItemProps = {
  vote: TVote;
};

function VoteItem({ vote, sortOrder }: voteItemProps & { sortOrder?: string }) {
  const { vote_postId, image_url, title, nickname, votes_count, comments_count } = vote;
  return (
    <li className="w-full">
      <Link
        href={`/boards/votes/${vote_postId}?sortOrder=${sortOrder}`}
        className="w-full h-[374px] md:h-[310px] flex-col justify-start items-center inline-flex transform transition-transform duration-300 ease-out hover:-translate-y-2 rounded-xl overflow-hidden shadow-lg"
      >
        <div className="relative w-full h-[220px] md:h-[155px]">
          <Image
            className="grow shrink basis-0 object-cover"
            src={image_url}
            alt="게시글 이미지"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start p-3 bg-[#f6f5f1] gap-2 flex">
          <div className="self-stretch h-[59px] text-black text-xl font-semibold leading-7 line-clamp-2">{title}</div>
          <div className="self-stretch text-gray-700 text-sm font-normal leading-tight">{nickname}</div>
        </div>
        <div className="h-11 self-stretch grow shrink basis-0 px-2 bg-gray-900 justify-start items-center gap-3 flex">
          <div className="justify-start items-center flex">
            <div className="w-6 h-6 p-[3px] justify-center items-center flex">👀</div>
            <div className="justify-start items-center gap-0.5 flex">
              <div className="text-main text-[13px] font-semibold leading-[18px]">투표수</div>
              <div className="text-main text-sm font-semibold leading-tight">{votes_count}</div>
            </div>
          </div>
          <div className="justify-start items-center flex">
            <div className="w-6 h-6 p-1 justify-center items-center flex">🔥</div>
            <div className="justify-start items-center gap-0.5 flex">
              <div className="text-point text-[13px] font-semibold leading-[18px]">댓글</div>
              <div className="text-point text-sm font-semibold leading-tight">{comments_count}</div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default VoteItem;
