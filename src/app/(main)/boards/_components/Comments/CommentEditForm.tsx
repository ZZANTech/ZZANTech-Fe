import { TKnowhowComment } from "@/types/knowhow.type";
import { TVoteComment } from "@/types/vote.type";
import { ChangeEventHandler } from "react";

type CommentEditFormProps = {
  editedContent: TKnowhowComment["content"] | TVoteComment["content"];
  onContentChange: ChangeEventHandler<HTMLTextAreaElement>;
  onCommentUpdate: () => void;
  onCancel: () => void;
};

function CommentEditForm({
  editedContent,
  onContentChange: handleContentChange,
  onCommentUpdate: handleCommentUpdate,
  onCancel: handleCancel
}: CommentEditFormProps) {
  return (
    <form className="w-full flex flex-col gap-3">
      <textarea
        maxLength={500}
        className="h-[90px] px-[19px] pt-3.5 pb-[52px] bg-white rounded-lg border border-[#8b8b8b] justify-start items-center inline-flex scrollbar-hide"
        value={editedContent}
        onChange={handleContentChange}
      />
      <div className="h-9 flex justify-end items-center gap-2">
        <button
          type="button"
          onClick={handleCommentUpdate}
          className="h-9 px-4 py-[9px] bg-white rounded-[100px] border border-[#ccccc6] flex justify-center items-center gap-2.5"
        >
          <span className="text-center text-[#1b1b1b] text-sm font-normal leading-[18px] font-['Pretendard']">
            수정하기
          </span>
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="h-9 px-4 py-[9px] bg-white rounded-[100px] border border-[#ccccc6] flex justify-center items-center gap-2.5"
        >
          <span className="text-center text-[#1b1b1b] text-sm font-normal leading-[18px] font-['Pretendard']">
            취소
          </span>
        </button>
      </div>
    </form>
  );
}

export default CommentEditForm;
