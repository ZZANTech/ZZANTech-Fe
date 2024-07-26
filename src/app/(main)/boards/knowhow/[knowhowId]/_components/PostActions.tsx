"use client";
import KnowhowLikes from "./KnowhowLikes";
import ActionNav from "./ActionNav";
import { TKnowhow } from "@/types/knowhow.type";

type PostActionsProps = {
  knowhow: TKnowhow;
};

function PostActions({ knowhow }: PostActionsProps) {
  return (
    <section className="flex gap-1 items-center">
      <KnowhowLikes knowhowId={knowhow.knowhow_postId} />
      <ActionNav knowhow={knowhow} />
    </section>
  );
}

export default PostActions;
