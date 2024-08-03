function NoPostsMessage({ isLikedPosts }: { isLikedPosts?: boolean }) {
  return (
    <div className={`w-full text-center my-[104px] ${isLikedPosts && "my-[219px]"}`}>
      <p className="text-basic text-2xl">
        {isLikedPosts ? "좋아요 누른 게시글이 없습니다" : "작성한 게시글이 없습니다"}
      </p>
    </div>
  );
}

export default NoPostsMessage;
