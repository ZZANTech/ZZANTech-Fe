"use client";
import Button from "@/components/Button/Button";
import useAlertModal from "@/hooks/useAlertModal";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import useKnowhowCommentMutation from "@/stores/queries/useKnowhowCommentMutation";
import useVoteCommentMutation from "@/stores/queries/useVoteCommentMutation";
import { useRouter } from "next/navigation";
import { FormEventHandler, useRef } from "react";

type CommentFormProps = {
  postId: number;
  board: "knowhow" | "vote";
};

function CommentForm({ postId, board }: CommentFormProps) {
  const { user } = useUserContext();
  const modal = useModal();
  const router = useRouter();
  const { displayDefaultAlert } = useAlertModal();

  const { addKnowhowComment } = useKnowhowCommentMutation();
  const { addVoteComment } = useVoteCommentMutation();

  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const handleOpenModal = () =>
    modal.open({
      type: "confirm",
      content: "로그인 후 이용해 주세요.",
      onConfirm: () => router.push("/login")
    });

  const handleCommentSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!user) {
      handleOpenModal();
      return;
    }

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
    <form onSubmit={handleCommentSubmit} className="w-full flex flex-col gap-[19px]">
      <textarea ref={commentInputRef} className="h-[90px] w-full bg-white border border-gray-800 resize-none" />
      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-[83px] h-[42px] bg-gray-900 text-[#e1ff01] text-[13px] font-semibold leading-[30px] rounded-none"
        >
          작성하기
        </Button>
      </div>
    </form>
  );
}

export default CommentForm;
