"use client";

import NavButton from "@/app/(main)/boards/votes/[voteId]/_components/NavButton";
import VoteButtons from "@/app/(main)/boards/votes/[voteId]/_components/VoteButtons";
import { TVote } from "@/types/vote.type";

type VoteContentProps = {
  vote: TVote;
};

function VoteContent({ vote }: VoteContentProps) {
  const { title, product_name, product_price, nickname, image_url, content } = vote;

  return (
    <section>
      <NavButton direction="prev" />
      <div>{title}</div>
      {/* 아래 div 디자인 확정되면 수정할 것 */}
      <div>
        <div>
          <span>{product_name}</span>
          <span>{product_price}</span>
        </div>
        <div>{nickname}</div>
      </div>
      <div>
        <img src="" alt="" />
      </div>
      <VoteButtons />
      <div>{content}</div>
      <NavButton direction="next" />
    </section>
  );
}

export default VoteContent;
