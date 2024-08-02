"use client";

import { TKnowhowComment } from "@/types/knowhow.type";
import { TVoteComment } from "@/types/vote.type";
import { formatTime } from "@/app/(main)/boards/_utils";
import useKnowhowCommentMutation from "@/stores/queries/useKnowhowCommentMutation";
import { ChangeEventHandler, useState } from "react";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import CommentActions from "@/app/(main)/boards/_components/Comments/CommentActions";
import CommentEditForm from "@/app/(main)/boards/_components/Comments/CommentEditForm";
import useAlertModal from "@/hooks/useAlertModal";
import useVoteCommentMutation from "@/stores/queries/useVoteCommentMutation";
import Image from "next/image";
import useConfirmModal from "@/hooks/useConfirmModal";

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
  const modal = useModal();
  const { displayDeleteModal } = useConfirmModal();
  const { displayDefaultAlert } = useAlertModal();
  const { nickname, content, created_at } = comment;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(content || "");

  const { updateKnowhowComment, removeKnowhowComment } = useKnowhowCommentMutation();
  const { updateVoteComment, removeVoteComment } = useVoteCommentMutation();

  const { formattedDate, formattedTime } = formatTime(created_at);

  const handleOpenModal = () => displayDeleteModal(handleCommentDelete);

  const handleEditModeChange = () => setIsEditing(true);

  const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => setEditedContent(e.target.value);

  const handleCommentDelete = () => {
    if (board === "knowhow") {
      removeKnowhowComment(comment as TKnowhowComment);
    } else {
      removeVoteComment(comment as TVoteComment);
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

    if (board === "knowhow") {
      await updateKnowhowComment(updatedComment as TKnowhowComment);
    } else {
      await updateVoteComment(updatedComment as TVoteComment);
    }

    setIsEditing(false);
  };

  return (
    <li className="w-full h-24 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-[7px]">
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
        {!isEditing && user?.userId === comment?.user_id && (
          <CommentActions onEditModeChange={handleEditModeChange} onOpenModal={handleOpenModal} />
        )}
      </div>
      {!isEditing && (
        <>
          <p className="w-full text-black text-base font-normal leading-normal">{content}</p>
        </>
      )}
      {isEditing && (
        <CommentEditForm
          editedContent={editedContent}
          onContentChange={handleContentChange}
          onCommentUpdate={handleCommentUpdate}
        />
      )}
    </li>
  );
}

export default CommentItem;
