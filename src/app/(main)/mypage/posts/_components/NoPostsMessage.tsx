import clsx from "clsx";

function NoPostsMessage({ type }: { type: "likedPosts" | "myPosts" | "claims" }) {
  const isLikedPosts = type === "likedPosts";
  const isClaims = type === "claims";
  const isMyPosts = type === "myPosts";

  return (
    <div className={clsx("w-full text-center", isMyPosts ? "my-[175px] md:my-[104px]" : "my-[270px] md:my-[219px]")}>
      <p
        className="
      text-gray-500 text-lg font-semibold
      md:text-gray-900 md:text-2xl
      "
      >
        {isLikedPosts && "좋아요 누른 게시글이 없습니다"}
        {isClaims && "교환내역이 없습니다"}
        {!isLikedPosts && !isClaims && "작성한 게시글이 없습니다"}
      </p>
    </div>
  );
}

export default NoPostsMessage;
