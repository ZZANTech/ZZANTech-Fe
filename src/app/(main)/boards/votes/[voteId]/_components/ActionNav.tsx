"use client";

import Button from "@/components/Button/Button";
import { TVote } from "@/types/vote.type";

type ActionNavProps = {
  vote: TVote;
};

function ActionNav({ vote }: ActionNavProps) {
  return (
    <nav className="flex gap-1">
      <Button href={`/boards/votes/edit/${vote.vote_postId}`}>수정</Button>
      <Button>삭제</Button>
      <Button href="/boards/votes">목록으로</Button>
    </nav>
  );
}

export default ActionNav;
