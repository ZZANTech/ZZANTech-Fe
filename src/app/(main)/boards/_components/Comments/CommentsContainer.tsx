"use client";

import CommentForm from "@/app/(main)/boards/_components/Comments/CommentForm";
import CommentsList from "@/app/(main)/boards/_components/Comments/CommentsList";
import useKnowhowCommentsQuery from "@/stores/queries/knowhow/comment/useKnowhowCommentsQuery";
import useVoteCommentsQuery from "@/stores/queries/vote/comment/useVoteCommentsQuery";
import { TKnowhowComment } from "@/types/knowhow.type";
import { TVoteComment } from "@/types/vote.type";

type CommentsContainerProps = {
  postId: number;
  board: "knowhow" | "vote";
};

function CommentsContainer({ postId, board }: CommentsContainerProps) {
  const pageSize = 10;

  const knowhowQuery = useKnowhowCommentsQuery(postId, pageSize, board === "knowhow");
  const voteQuery = useVoteCommentsQuery(postId, pageSize, board === "vote");

  const query = board === "knowhow" ? knowhowQuery : voteQuery;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = query;

  const comments =
    board === "knowhow"
      ? data?.pages.flatMap((page) => page.comments as TKnowhowComment[]) || []
      : data?.pages.flatMap((page) => page.comments as TVoteComment[]) || [];

  const totalCommentsCount = data?.pages[0]?.totalCommentsCount || 0;

  const loadMoreComments = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <section className={`flex flex-col w-full ${board === "knowhow" ? "md:max-w-[928px]" : "md:max-w-[700px]"}`}>
      <div className="flex flex-col w-full ml-1 mb-3">
        <div className="w-full text-black text-lg font-normal leading-[27px]">댓글 {totalCommentsCount}</div>
      </div>
      <CommentForm postId={postId} board={board} />
      {totalCommentsCount > 0 && <CommentsList comments={comments} board={board} />}
      {totalCommentsCount > pageSize && hasNextPage && (
        <button
          onClick={loadMoreComments}
          className="w-full h-11 mt-12 self-center items-center rounded-lg border border-[#1b1b1b] text-sm font-normal py-2 px-4"
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "로딩 중..." : "더 보기"}
        </button>
      )}
    </section>
  );
}

export default CommentsContainer;
