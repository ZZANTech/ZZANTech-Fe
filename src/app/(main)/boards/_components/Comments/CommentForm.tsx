"use client";
import Button from "@/components/Button/Button";
import useKnowhowCommentMutation from "@/store/queries/useKnowhowCommentMutation";
import { FormEventHandler, useRef } from "react";

type CommentFormProps = {
  postId: number;
};

function CommentForm({ postId }: CommentFormProps) {
  const { addKnowhowComment } = useKnowhowCommentMutation();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const handleCommentSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (commentInputRef.current && postId) {
      const newComment = {
        content: commentInputRef.current?.value,
        user_id: "a16e76cd-30fb-4130-b321-ec457d17783c",
        knowhow_post_id: postId
      };
      await addKnowhowComment(newComment);
      commentInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className="flex flex-col w-[768px]">
      <textarea ref={commentInputRef} className="border resize-none mb-4" />
      <div className="flex justify-end">
        <Button type="submit">댓글 등록</Button>
      </div>
    </form>
  );
}

export default CommentForm;
