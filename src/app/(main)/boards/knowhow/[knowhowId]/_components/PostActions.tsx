"use client";
import Button from "@/components/Button/Button";
import KnowhowLikes from "./KnowhowLikes";
import ActionNav from "./ActionNav";

type PostActionsProps = {
  knowhowId: number;
};

function PostActions({ knowhowId }: PostActionsProps) {
  return (
    <section className="flex gap-1 items-center">
      <KnowhowLikes knowhowId={knowhowId} />
      <ActionNav knowhowId={knowhowId} />
    </section>
  );
}

export default PostActions;
