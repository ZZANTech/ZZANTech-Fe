import { TKnowhowComment } from "@/types/knowhow.type";
import { formatTime } from "../../_utils";
import useKnowhowCommentMutation from "@/stores/queries/useKnowhowCommentMutation";

type CommentItemProps = {
  comment: TKnowhowComment;
};

function CommentItem({ comment }: CommentItemProps) {
  const { removeKnowhowComment } = useKnowhowCommentMutation();
  const { nickname, content, created_at } = comment;
  const { formattedDate, formattedTime } = formatTime(created_at);
  return (
    <li className="mt-4 border rounded-xl">
      <span>{nickname}</span>
      <p>{content}</p>
      <div>
        <time>{formattedDate} </time>
        <time>{formattedTime}</time>
      </div>
    </li>
  );
}

export default CommentItem;
