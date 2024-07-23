"use client";

import useKnowhowCommentsQuery from "@/store/queries/useKnowhowCommentsQuery";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

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
