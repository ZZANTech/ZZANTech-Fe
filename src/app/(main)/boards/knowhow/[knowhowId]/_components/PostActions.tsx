"use client";

import ActionNav from "@/app/(main)/boards/knowhow/[knowhowId]/_components/ActionNav";
import KnowhowLikes from "@/app/(main)/boards/knowhow/[knowhowId]/_components/KnowhowLikes";
import { TKnowhow } from "@/types/knowhow.type";

type PostActionsProps = {
  knowhow: TKnowhow;
};

function PostActions({ knowhow }: PostActionsProps) {
  return (
    <section className="flex gap-1 justify-between items-center mr-[28px] mb-[45px]">
      <KnowhowLikes knowhowId={knowhow.knowhow_postId} />
      <ActionNav knowhow={knowhow} />
    </section>
  );
}

export default PostActions;
