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
    <form className="w-full flex flex-col gap-2">
      <textarea
        maxLength={300}
        className="h-[92px] px-5 pt-4 pb-[52px] bg-white rounded-lg border border-[#8b8b8b] justify-start items-center inline-flex scrollbar-hide resize-none"
        value={editedContent}
        onChange={handleContentChange}
      />
      <div className="h-11 flex justify-end items-center gap-2">
        <button
          type="button"
          onClick={handleCommentUpdate}
          className="w-20 h-11 p-3 bg-white rounded-xl border border-[#ccccc6] flex justify-center"
        >
          <span className="text-center text-[#1b1b1b] text-sm font-normal leading-[18px]">수정하기</span>
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-20 h-11 p-3 bg-white rounded-xl border border-[#ccccc6] flex justify-center"
        >
          <span className="text-center text-gray-900 text-sm font-normal leading-[18px]">취소</span>
        </button>
      </div>
    </form>
  );
}

export default CommentEditForm;
