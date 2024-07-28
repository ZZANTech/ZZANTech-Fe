"use client";
import Button from "@/components/Button/Button";
import useAlertModal from "@/hooks/useAlertModal";
import { useUserContext } from "@/provider/contexts/UserContext";
import useKnowhowCommentMutation from "@/stores/queries/useKnowhowCommentMutation";
import { FormEventHandler, useRef } from "react";

type CommentFormProps = {
  postId: number;
};

function CommentForm({ postId }: CommentFormProps) {
  const { user } = useUserContext();
  const { displayDefaultAlert } = useAlertModal();
  const { addKnowhowComment } = useKnowhowCommentMutation();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const handleCommentSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (commentInputRef.current && postId && user) {
      if (!commentInputRef.current.value.trim()) {
        displayDefaultAlert("내용을 입력하세요.");
        return;
      }
      const newComment = {
        content: commentInputRef.current?.value,
        user_id: user.userId,
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
