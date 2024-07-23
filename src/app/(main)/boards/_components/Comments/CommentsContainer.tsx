"use client";

import useCommentsQuery from "@/stores/queries/useCommentsQuery";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

type CommentsContainerProps = {
  postId: number;
};

function CommentsContainer({ postId }: CommentsContainerProps) {
  const { data: comments } = useCommentsQuery(postId);
  return (
    <section>
      <span>댓글 {comments?.length || 0}개</span>
      <CommentForm />
      {comments && <CommentsList comments={comments} />}
    </section>
  );
}

export default CommentsContainer;
