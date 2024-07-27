"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import useKnowhowLikeMutation from "@/stores/queries/useKnowhowLikeMutation";
import useKnowhowLikesCountQuery from "@/stores/queries/useKnowhowLikesCountQuery";
import { Tables } from "@/types/supabase";

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
    <div className="flex gap-1 ">
      <div onClick={handleUpdateLike}>{likeCountData?.isLiked ? "🩷" : "🤍"}</div>
      <div>좋아요</div>
      <div className="w-5 rounded">{likeCountData ? `${likeCountData.likeCount}` : "0"}</div>
    </div>
  );
}

export default KnowhowLikes;
