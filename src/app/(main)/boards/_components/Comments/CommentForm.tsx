"use client";

import useAlertModal from "@/hooks/useAlertModal";
import { useUserContext } from "@/provider/contexts/UserContext";
import useKnowhowCommentMutation from "@/stores/queries/knowhow/comment/useKnowhowCommentMutation";
import useVoteCommentMutation from "@/stores/queries/vote/comment/useVoteCommentMutation";
import Image from "next/image";
import { FormEventHandler, useRef } from "react";
import FlyingTikkle from "@/components/Loading/FlyingTikkle";

type CommentFormProps = {
  postId: number;
  board: "knowhow" | "vote";
  onCommentSubmit: () => void;
};

function CommentForm({ postId, board, onCommentSubmit }: CommentFormProps) {
  const { user } = useUserContext();
  const { displayDefaultAlert, displayLoginAlert } = useAlertModal();

  const { addKnowhowComment, isKnowhowCommentPostPending } = useKnowhowCommentMutation();
  const { addVoteComment, isVoteCommentPostPending } = useVoteCommentMutation();

  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const handleCommentSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!user) {
      displayLoginAlert();
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

        onCommentSubmit();
      } catch (error) {
        displayDefaultAlert("댓글 등록에 실패했습니다.");
      }
    }
  };

  const isPending = isKnowhowCommentPostPending || isVoteCommentPostPending;

  return (
    <form onSubmit={handleCommentSubmit} className="w-full flex flex-col gap-[12px]">
      <textarea
        ref={commentInputRef}
        maxLength={300}
        className="h-[92px] px-5 pt-4 pb-[52px] bg-white rounded-lg border border-[#8b8b8b] justify-start items-center inline-flex scrollbar-hide resize-none"
        disabled={isPending}
      />
      <div className="flex justify-end mb-[36px]">
        <button
          type="submit"
          className="w-[124px] h-[44px] bg-gray-900 text-white text-[13px] font-semibold leading-[30px] rounded-lg flex justify-center items-center gap-2.5"
          disabled={isPending}
        >
          <div className="w-5 h-5 flex justify-center items-center">
            <Image src="/icons/mypage/pen_white.png" width={20} height={20} alt="연필 이미지" className="w-5 h-5" />
          </div>
          <div className="text-center text-white text-sm font-semibold leading-tight">댓글쓰기</div>
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
