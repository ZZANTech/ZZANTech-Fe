import CommentItem from "@/app/(main)/boards/_components/Comments/CommentItem";
import { TKnowhowComment } from "@/types/knowhow.type";
import { TVoteComment } from "@/types/vote.type";
import Image from "next/image";

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
          <div className="flex justify-center items-center">
            <button
              onClick={loadMoreComments}
              className="flex items-center justify-center gap-3 w-full h-11 bg-white rounded-lg border border-[#1b1b1b] text-sm font-normal py-2 px-4 transition-all duration-300 ease-in-out"
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "로딩 중" : "더 보기"}
              <Image src="/icons/down_arrow.png" alt="아래 화살표" width={20} height={20} />
            </button>
          </div>
        )}
      </ul>
    </>
  );
}

export default CommentsList;
