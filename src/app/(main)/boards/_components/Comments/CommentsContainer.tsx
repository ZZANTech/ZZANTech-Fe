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
    <section className={`w-[700px] flex flex-col gap-8 ${board === "knowhow" ? "w-[928px]" : "w-[700px]"}`}>
      <div className="w-full flex flex-col">
        <div className="w-full h-[59px] px-1.5 py-4 flex flex-col">
          <div className="w-full text-black text-lg font-normal leading-[27px]">댓글 {comments?.length || 0}</div>
        </div>
        <CommentForm postId={postId} board={board} />
        {comments && <CommentsList comments={comments} board={board} />}
      </div>
    </section>
  );
}

export default CommentsContainer;
