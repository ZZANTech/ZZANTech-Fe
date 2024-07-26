"use client";

import { TVote } from "@/types/vote.type";
import NavButton from "./NavButton";
import VoteButtons from "./VoteButtons";

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
        <img src={image_url} alt="게시글 이미지" className="w-32 h-32 object-cover" />
      </div>
      <VoteButtons />
      <div>{content}</div>
      <NavButton direction="next" />
    </section>
  );
}

export default VoteContent;
