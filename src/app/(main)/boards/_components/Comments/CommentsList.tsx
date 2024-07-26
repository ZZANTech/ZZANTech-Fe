import CommentItem from "@/app/(main)/boards/_components/Comments/CommentItem";
import { TKnowhowComment } from "@/types/knowhow.type";

type CommentsListProps = {
  comments: TKnowhowComment[];
};

function CommentsList({ comments }: CommentsListProps) {
  return <ul>{comments?.map((comment) => <CommentItem key={comment.knowhow_commentId} comment={comment} />)}</ul>;
}

export default CommentsList;
