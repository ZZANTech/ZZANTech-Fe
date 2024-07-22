import { TKnowhowComment } from "@/types/knowhow.type";
import CommentItem from "./CommentItem";

type CommentsListProps = {
  comments: TKnowhowComment[];
};

function CommentsList({ comments }: CommentsListProps) {
  return <ul>{comments?.map((comment) => <CommentItem key={comment.knowhow_commentId} comment={comment} />)}</ul>;
}

export default CommentsList;
