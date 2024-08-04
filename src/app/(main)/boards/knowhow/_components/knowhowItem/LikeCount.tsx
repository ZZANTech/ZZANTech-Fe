import useKnowhowLikesCountQuery from "@/stores/queries/knowhow/like/useKnowhowLikesCountQuery";
import { TKnowhow } from "@/types/knowhow.type";
import filledHeart from "/public/icons/filled_heart.svg";
import emptyHeart from "/public/icons/empty_heart.svg";
import Image from "next/image";

type LikeCountProps = {
  knowhowId: TKnowhow["knowhow_postId"];
  likesCount: TKnowhow["likes_count"];
};

function LikeCount({ knowhowId, likesCount }: LikeCountProps) {
  const { data: likeCountData } = useKnowhowLikesCountQuery(knowhowId);

  return (
    <div className="flex gap-2 items-center">
      {likeCountData?.isLiked && <Image src={filledHeart} alt="like" />}
      {!likeCountData?.isLiked && <Image src={emptyHeart} alt="like" />}

      <span>{likeCountData?.likeCount || likesCount}</span>
    </div>
  );
}

export default LikeCount;
