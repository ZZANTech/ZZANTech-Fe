"use client";

import CommentForm from "@/app/(main)/boards/_components/Comments/CommentForm";
import CommentsList from "@/app/(main)/boards/_components/Comments/CommentsList";
import useKnowhowCommentsQuery from "@/stores/queries/useKnowhowCommentsQuery";

type CommentsContainerProps = {
  postId: number;
};

function CommentsContainer({ postId }: CommentsContainerProps) {
  const { data: comments } = useKnowhowCommentsQuery(postId);
  return (
    <section>
      <span>댓글 {comments?.length || 0}개</span>
      <CommentForm postId={postId} />
      {comments && <CommentsList comments={comments} />}
    </section>
  );
}

export default CommentsContainer;
