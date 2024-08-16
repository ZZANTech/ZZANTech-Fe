"use client";

import CommentForm from "@/app/(main)/boards/_components/Comments/CommentForm";
import CommentsList from "@/app/(main)/boards/_components/Comments/CommentsList";
import useKnowhowCommentsQuery from "@/stores/queries/knowhow/comment/useKnowhowCommentsQuery";
import useVoteCommentsQuery from "@/stores/queries/vote/comment/useVoteCommentsQuery";

type CommentsContainerProps = {
  postId: number;
  board: "knowhow" | "vote";
};

function CommentsContainer({ postId, board }: CommentsContainerProps) {
  const { data: KnowhowComments } = useKnowhowCommentsQuery(postId);
  const { data: VoteComments } = useVoteCommentsQuery(postId);

  const comments = board === "knowhow" ? KnowhowComments : VoteComments;

  return (
    <section className={`flex flex-col ${board === "knowhow" ? "w-[928px]" : "w-[700px]"}`}>
      <div className="w-full flex flex-col ml-1 mb-3">
        <div className="w-full text-black text-lg font-normal leading-[27px]">댓글 {comments?.length || 0}</div>
      </div>
      <CommentForm postId={postId} board={board} />
      {comments && <CommentsList comments={comments} board={board} />}
    </section>
  );
}

export default CommentsContainer;
