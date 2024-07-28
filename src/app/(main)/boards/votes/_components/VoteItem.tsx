import { TVote } from "@/types/vote.type";
import Link from "next/link";
import Image from "next/image";

type voteItemProps = {
  vote: TVote;
};

function VoteItem({ vote }: voteItemProps) {
  const { vote_postId, image_url, title, nickname, votes_count, comments_count } = vote;

  return (
    <li className="w-[252px] h-[310px] shadow flex-col justify-start items-center inline-flex">
      <Link href={`/boards/votes/${vote_postId}`}>
        <div className="w-[252px] h-[310px] shadow flex-col justify-start items-center inline-flex">
          <div className="relative w-[252px] h-[155px]">
            <Image
              className="grow shrink basis-0"
              src={image_url}
              alt="게시글 이미지"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start p-3 bg-gray-100 gap-2 flex">
            <div className="self-stretch h-[59px] text-black text-xl font-semibold leading-7 truncate">{title}</div>
            <div className="self-stretch text-[#6c6c6c] text-sm font-normal leading-tight">{nickname}</div>
          </div>
          <div className="self-stretch grow shrink basis-0 px-2 bg-gray-900 justify-start items-center gap-3 flex">
            <div className="justify-start items-center flex">
              <div className="w-6 h-6 p-[3px] justify-center items-center flex">👀</div>
              <div className="justify-start items-center gap-0.5 flex">
                <div className="text-[#e1ff01] text-[13px] font-semibold leading-[18px]">투표수</div>
                <div className="text-[#e1ff01] text-sm font-semibold leading-tight">{votes_count}</div>
              </div>
            </div>
            <div className="justify-start items-center flex">
              <div className="w-6 h-6 p-1 justify-center items-center flex">🔥</div>
              <div className="justify-start items-center gap-0.5 flex">
                <div className="text-[#ff6000] text-[13px] font-semibold leading-[18px]">댓글</div>
                <div className="text-[#ff6000] text-sm font-semibold leading-tight">{comments_count}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default VoteItem;
