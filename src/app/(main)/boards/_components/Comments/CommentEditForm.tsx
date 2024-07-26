import Button from "@/components/Button/Button";
import { TKnowhowComment } from "@/types/knowhow.type";
import { ChangeEventHandler } from "react";

type CommentEditFormProps = {
  editedContent: TKnowhowComment["content"];
  onContentChange: ChangeEventHandler<HTMLTextAreaElement>;
  onCommentUpdate: () => void;
};

function CommentEditForm({
  editedContent,
  onContentChange: handleContentChange,
  onCommentUpdate: handleCommentUpdate
}: CommentEditFormProps) {
  return (
    <form>
      <textarea className=" border resize-none w-full" value={editedContent} onChange={handleContentChange} />
      <div className="flex justify-end">
        <Button type="button" onClick={handleCommentUpdate}>
          수정완료
        </Button>
      </div>
    </form>
  );
}

export default CommentEditForm;
