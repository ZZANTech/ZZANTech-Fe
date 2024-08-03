function NoPostsMessage({ type }: { type: "likedPosts" | "myPosts" | "claims" }) {
  const isLikedPosts = type === "likedPosts";
  const isClaims = type === "claims";
  const isMyPosts = type === "myPosts";

  return (
    <div className={`w-full text-center ${!isMyPosts ? "my-[219px]" : "my-[104px]"}`}>
      <p className="text-basic text-2xl">
        {isLikedPosts && "좋아요 누른 게시글이 없습니다"}
        {isClaims && "교환내역이 없습니다"}
        {!isLikedPosts && !isClaims && "작성한 게시글이 없습니다"}
      </p>
    </div>
  );
}

export default NoPostsMessage;
