"use client";
import NavButton from "@/app/(main)/boards/votes/[voteId]/_components/NavButton";
import VoteButtons from "@/app/(main)/boards/votes/[voteId]/_components/VoteButtons";
import { TVote } from "@/types/vote.type";
import { useSearchParams } from "next/navigation";

type VoteContentProps = {
  vote: TVote;
};

function VoteContent({ vote }: VoteContentProps) {
  const { title, product_name, product_price, nickname, image_url, vote_postId, content } = vote;
  const searchParams = useSearchParams();
  const sortOrder = searchParams.get("sortOrder");
  const showNavButtons = sortOrder === "latest";

  return (
    <section>
      {showNavButtons && <NavButton vote={vote} direction="prev" />}
      <div>
        {title}
      </div>
      <div>
        <div>
          <span>{product_name}</span>
          <span>{product_price}</span>
        </div>
        <div>{nickname}</div>
      </div>
      <div>
        <Image src={image_url} alt="게시글 이미지" className="w-32 h-32 object-cover" width={128} height={128} />
      </div>
      <VoteButtons voteId={vote_postId} />
      <div>{content}</div>
      {showNavButtons && <NavButton vote={vote} direction="next" />}
    </section>
  );
}

export default VoteContent;
