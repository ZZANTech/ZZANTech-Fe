"use client";

import CommentForm from "@/app/(main)/boards/_components/Comments/CommentForm";
import CommentsList from "@/app/(main)/boards/_components/Comments/CommentsList";
import useKnowhowCommentsQuery from "@/stores/queries/useKnowhowCommentsQuery";
import useVoteCommentsQuery from "@/stores/queries/useVoteCommentsQuery";

type CommentsContainerProps = {
  postId: number;
  board: "knowhow" | "vote";
};

function CommentsContainer({ postId, board }: CommentsContainerProps) {
  const { data: KnowhowComments } = useKnowhowCommentsQuery(postId);
  const { data: VoteComments } = useVoteCommentsQuery(postId);

  const comments = board === "knowhow" ? KnowhowComments : VoteComments;

  return (
    <section className="px-[30px] w-full">
      <span className="block text-[#444] text-xl mb-[15px]">댓글 {comments?.length || 0}개</span>
      <CommentForm postId={postId} board={board} />
      {comments && <CommentsList comments={comments} board={board} />}
    </section>
  );
}

export default CommentsContainer;
