"use client";

import { TKnowhowComment } from "@/types/knowhow.type";
import { TVoteComment } from "@/types/vote.type";
import { formatTime } from "@/app/(main)/boards/_utils";
import useKnowhowCommentMutation from "@/stores/queries/knowhow/comment/useKnowhowCommentMutation";
import { ChangeEventHandler, useState } from "react";
import { useUserContext } from "@/provider/contexts/UserContext";
import CommentActions from "@/app/(main)/boards/_components/Comments/CommentActions";
import CommentEditForm from "@/app/(main)/boards/_components/Comments/CommentEditForm";
import useAlertModal from "@/hooks/useAlertModal";
import useVoteCommentMutation from "@/stores/queries/vote/comment/useVoteCommentMutation";
import Image from "next/image";
import useConfirmModal from "@/hooks/useConfirmModal";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

type CommentItemPropsForKnowhow = {
  comment: TKnowhowComment;
  board: "knowhow" | "vote";
};

type CommentItemPropsForVote = {
  comment: TVoteComment;
  board: "knowhow" | "vote";
};

function CommentItem({ comment, board }: CommentItemPropsForKnowhow | CommentItemPropsForVote) {
  const { user } = useUserContext();
  const { displayDeleteModal } = useConfirmModal();
  const { displayDefaultAlert } = useAlertModal();
  const { nickname, content, created_at } = comment;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(content || "");

  const { updateKnowhowComment, isKnowhowCommentPostPending, removeKnowhowComment } = useKnowhowCommentMutation();
  const { updateVoteComment, isVoteCommentPostPending, removeVoteComment } = useVoteCommentMutation();

  const { formattedDate, formattedTime } = formatTime(created_at);

  const isPending = isKnowhowCommentPostPending || isVoteCommentPostPending;

  const handleOpenModal = () => displayDeleteModal(handleCommentDelete);

  const handleEditModeChange = () => setIsEditing(true);

  const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => setEditedContent(e.target.value);

  const handleCommentDelete = async () => {
    try {
      if (board === "knowhow") {
        await removeKnowhowComment(comment as TKnowhowComment);
      } else {
        await removeVoteComment(comment as TVoteComment);
      }
    } catch (error) {
      displayDefaultAlert("댓글 삭제에 실패했습니다.");
    }
  };

  const handleCommentUpdate = async () => {
    const { nickname, badge_url, ...commentWithoutUser } = comment;

    if (!editedContent.trim().length) {
      displayDefaultAlert("내용을 입력하세요.");
      return;
    }

    const updatedComment = {
      ...commentWithoutUser,
      content: editedContent
    };

    try {
      if (board === "knowhow") {
        await updateKnowhowComment(updatedComment as TKnowhowComment);
      } else {
        await updateVoteComment(updatedComment as TVoteComment);
      }
      setIsEditing(false);
    } catch (error) {
      displayDefaultAlert("댓글 수정에 실패했습니다.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(content);
  };

  return (
    <li className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex justify-center items-center relative aspect-square">
              <Image className="rounded-full object-cover" src={comment.badge_url || ""} alt="profile" fill />
            </div>
            <div className="text-black text-base font-semibold leading-snug">{nickname}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[#acacac] text-sm font-normal leading-3">{formattedDate}</div>
            <div className="text-[#acacac] text-sm font-normal leading-3">{formattedTime}</div>
          </div>
        </div>
        {!isEditing && user?.userId === comment?.user_id && !isPending && (
          <CommentActions onEditModeChange={handleEditModeChange} onOpenModal={handleOpenModal} />
        )}
      </div>
      {isPending ? (
        <div className="flex justify-center items-center h-[90px]">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {!isEditing && (
            <p className="w-full text-black text-base font-normal leading-normal break-words whitespace-pre-wrap">
              {content}
            </p>
          )}
          {isEditing && (
            <CommentEditForm
              editedContent={editedContent}
              onContentChange={handleContentChange}
              onCommentUpdate={handleCommentUpdate}
              onCancel={handleCancelEdit}
            />
          )}
        </>
      )}
    </li>
  );
}

export default CommentItem;
