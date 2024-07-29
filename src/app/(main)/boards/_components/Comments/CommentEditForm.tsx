import Button from "@/components/Button/Button";
import { TKnowhowComment } from "@/types/knowhow.type";
import { TVoteComment } from "@/types/vote.type";
import { ChangeEventHandler } from "react";

type CommentEditFormProps = {
  editedContent: TKnowhowComment["content"] | TVoteComment["content"];
  onContentChange: ChangeEventHandler<HTMLTextAreaElement>;
  onCommentUpdate: () => void;
};

function CommentEditForm({
  editedContent,
  onContentChange: handleContentChange,
  onCommentUpdate: handleCommentUpdate
}: CommentEditFormProps) {
  return (
    <form className="w-full flex flex-col gap-3">
      <textarea
        className="border border-[#DCDCDC] rounded-xl resize-none w-full h-[118px] mb-4"
        value={editedContent}
        onChange={handleContentChange}
      />
      <div className="flex justify-end">
        <Button type="button" onClick={handleCommentUpdate}>
          수정완료
        </Button>
      </div>
    </form>
  );
}

export default CommentEditForm;
