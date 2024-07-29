"use client";
import Button from "@/components/Button/Button";
import useAlertModal from "@/hooks/useAlertModal";
import { useUserContext } from "@/provider/contexts/UserContext";
import useKnowhowCommentMutation from "@/stores/queries/useKnowhowCommentMutation";
import useVoteCommentMutation from "@/stores/queries/useVoteCommentMutation";
import { FormEventHandler, useRef } from "react";

type CommentFormProps = {
  postId: number;
  board: "knowhow" | "vote";
};

function CommentForm({ postId, board }: CommentFormProps) {
  const { user } = useUserContext();
  const { displayDefaultAlert } = useAlertModal();

  const { addKnowhowComment } = useKnowhowCommentMutation();
  const { addVoteComment } = useVoteCommentMutation();

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
        ...(board === "knowhow" ? { knowhow_post_id: postId } : { vote_post_id: postId })
      };

      try {
        if (board === "knowhow") {
          await addKnowhowComment(newComment);
        } else {
          await addVoteComment(newComment);
        }
        commentInputRef.current.value = "";
      } catch (error) {
        displayDefaultAlert("댓글 등록에 실패했습니다.");
      }
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className="flex flex-col w-full">
      <textarea ref={commentInputRef} className="h-[118px] rounded-xl border border-[#DCDCDC] resize-none mb-4" />
      <div className="flex justify-end">
        <Button type="submit">댓글 등록</Button>
      </div>
    </form>
  );
}

export default CommentForm;
