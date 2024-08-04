import CommentItem from "@/app/(main)/boards/_components/Comments/CommentItem";
import { TKnowhowComment } from "@/types/knowhow.type";
import { TVoteComment } from "@/types/vote.type";

function isKnowhowComment(comment: TKnowhowComment | TVoteComment): comment is TKnowhowComment {
  return (comment as TKnowhowComment).knowhow_commentId !== undefined;
}

type CommentsListProps = {
  comments: (TKnowhowComment | TVoteComment)[];
  board: "knowhow" | "vote";
};

function CommentsList({ comments, board }: CommentsListProps) {
  return (
    <ul
      className={`w-full flex flex-col gap-[40px]   ${board === "knowhow" && comments[0] && "bg-[#f6f5f1] p-6 rounded-2xl"}`}
    >
      {comments.map((comment) =>
        isKnowhowComment(comment) ? (
          <CommentItem key={comment.knowhow_commentId} comment={comment} board={board} />
        ) : (
          <CommentItem key={comment.vote_commentId} comment={comment} board={board} />
        )
      )}
    </ul>
  );
}

export default CommentsList;
