"use client";
import { TKnowhowComment } from "@/types/knowhow.type";
import { formatTime } from "@/app/(main)/boards/_utils";
import useKnowhowCommentMutation from "@/stores/queries/useKnowhowCommentMutation";
import { ChangeEventHandler, useState } from "react";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import CommentActions from "@/app/(main)/boards/_components/Comments/CommentActions";
import CommentEditForm from "@/app/(main)/boards/_components/Comments/CommentEditForm";
import useAlertModal from "@/hooks/useAlertModal";

type CommentItemProps = {
  comment: TKnowhowComment;
};

function CommentItem({ comment }: CommentItemProps) {
  const { user } = useUserContext();
  const modal = useModal();
  const { displayDefaultAlert } = useAlertModal();
  const { nickname, content, created_at } = comment;
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<TKnowhowComment["content"]>(content || "");
  const { updateKnowhowComment, removeKnowhowComment } = useKnowhowCommentMutation();
  const { formattedDate, formattedTime } = formatTime(created_at);

  const handleOpenModal = () =>
    modal.open({
      type: "confirm",
      content: "댓글을 삭제하시겠습니까?",
      onConfirm: handleCommentDelete
    });
  const handleEditModeChange = () => setIsEditting(true);
  const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => setEditedContent(e.target.value);
  const handleCommentDelete = () => removeKnowhowComment(comment);
  const handleCommentUpdate = async () => {
    ``;
    const { nickname, ...commentWithoutNickname } = comment;
    if (!editedContent.trim().length) {
      displayDefaultAlert("내용을 입력하세요.");
      return;
    }
    const updatedComment = {
      ...commentWithoutNickname,
      content: editedContent
    };
    await updateKnowhowComment(updatedComment);
    setIsEditting(false);
  };

  return (
    <li className="mt-4 border rounded-xl px-5">
      <div className="flex justify-between">
        <span>{nickname}</span>
        {!isEditting && user?.userId === comment?.user_id && (
          <CommentActions onEditModeChange={handleEditModeChange} onOpenModal={handleOpenModal} />
        )}
      </div>
      {!isEditting && (
        <>
          <p>{content}</p>
          <div>
            <time>{formattedDate} </time>
            <time>{formattedTime}</time>
          </div>
        </>
      )}
      {isEditting && (
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
