"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import useKnowhowLikeMutation from "@/stores/queries/knowhow/like/useKnowhowLikeMutation";
import useKnowhowLikesCountQuery from "@/stores/queries/knowhow/like/useKnowhowLikesCountQuery";
import filledHeart from "/public/icons/filled_heart.svg";
import emptyHeart from "/public/icons/empty_heart.svg";
import { Tables } from "@/types/supabase";
import Image from "next/image";

type knowhowLikesProps = {
  knowhowId: number;
};

function KnowhowLikes({ knowhowId }: knowhowLikesProps) {
  const { user } = useUserContext();
  const { data: likeCountData } = useKnowhowLikesCountQuery(knowhowId);
  const { updateLike } = useKnowhowLikeMutation();
  const handleUpdateLike = async () => {
    const likeData: Partial<Tables<"knowhow_likes">> = {
      knowhow_post_id: knowhowId,
      user_id: user?.userId
    };
    if (likeCountData) {
      await updateLike({ likeData, likeCountData });
    }
  };

  return (
    <div className="flex  items-center gap-2 ">
      <div className="cursor-pointer" onClick={handleUpdateLike}>
        {<Image src={likeCountData?.isLiked ? filledHeart : emptyHeart} alt="like" width={28} height={28} />}
      </div>
      <div className="flex gap-[2px] text-sm">
        <span className="">좋아요</span>
        <span className="w-5 rounded">{likeCountData ? `${likeCountData.likeCount}` : "0"}</span>
      </div>
    </div>
  );
}

export default KnowhowLikes;
