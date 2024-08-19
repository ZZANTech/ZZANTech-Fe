import CommentItem from "@/app/(main)/boards/_components/Comments/CommentItem";
import { TKnowhowComment } from "@/types/knowhow.type";
import { TVoteComment } from "@/types/vote.type";
import Image from "next/image";
import arrowDown from "/public/icons/filter/arrow_down.svg";
import Button from "@/components/Button";

function isKnowhowComment(comment: TKnowhowComment | TVoteComment): comment is TKnowhowComment {
  return (comment as TKnowhowComment).knowhow_commentId !== undefined;
}

type CommentsListProps = {
  comments: (TKnowhowComment | TVoteComment)[];
  board: "knowhow" | "vote";
  loadMoreComments: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  totalCommentsCount: number;
  pageSize: number;
};

function CommentsList({
  comments,
  board,
  loadMoreComments,
  hasNextPage,
  isFetchingNextPage,
  totalCommentsCount,
  pageSize
}: CommentsListProps) {
  return (
    <>
      <ul
        className={`w-full flex flex-col gap-10 ${board === "knowhow" && comments.length > 0 ? "bg-ivory p-6 rounded-2xl" : ""}`}
      >
        {comments.map((comment) =>
          isKnowhowComment(comment) ? (
            <CommentItem key={comment.knowhow_commentId} comment={comment} board={board} />
          ) : (
            <CommentItem key={comment.vote_commentId} comment={comment} board={board} />
          )
        )}
        {totalCommentsCount > pageSize && hasNextPage && (
          <Button
            className="text-gray-900 text-sm gap-3"
            onClick={loadMoreComments}
            disabled={isFetchingNextPage}
            fullWidth
            size={"small"}
            variant={"white"}
          >
            {isFetchingNextPage ? (
              <span className="text-gray-400">로딩중...</span>
            ) : (
              <>
                <span>더 보기</span> <Image src={arrowDown} alt="화살표" width={20} height={20} />
              </>
            )}
          </Button>
        )}
      </ul>
    </>
  );
}

export default CommentsList;
