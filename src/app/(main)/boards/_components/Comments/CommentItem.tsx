"use client";
import { TKnowhowComment } from "@/types/knowhow.type";
import { formatTime } from "@/app/(main)/boards/_utils";
import useKnowhowCommentMutation from "@/stores/queries/useKnowhowCommentMutation";
import { ChangeEventHandler, useState } from "react";
import Button from "@/components/Button/Button";
import { useModal } from "@/provider/contexts/modalContext";

type CommentItemProps = {
  comment: TKnowhowComment;
};

function CommentItem({ comment }: CommentItemProps) {
  const modal = useModal();
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
  const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => setEditedContent(e.target.value);
  const handleCommentDelete = () => removeKnowhowComment(comment);
  const handleCommentUpdate = async () => {
    const { nickname, ...commentWithoutNickname } = comment;
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
        {!isEditting && (
          <div className="flex gap-2">
            <span className="cursor-pointer" onClick={() => setIsEditting(true)}>
              수정
            </span>
            <span className="cursor-pointer" onClick={handleOpenModal}>
              삭제
            </span>
          </div>
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
        <div className="">
          <textarea className=" border resize-none w-full" value={editedContent} onChange={handleContentChange} />
          <div className="flex justify-end">
            <Button onClick={handleCommentUpdate}>수정완료</Button>
          </div>
        </div>
      )}
    </li>
  );
}

export default CommentItem;
