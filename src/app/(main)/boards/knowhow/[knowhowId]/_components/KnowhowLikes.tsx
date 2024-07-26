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
  console.log(likeCountData?.isLiked);
  const { updateLike } = useKnowhowLikeMutation();
  const handleUpdateLike = async () => {
    const likeData: Partial<Tables<"knowhow_likes">> = {
      knowhow_post_id: knowhowId,
      user_id: user?.userId
    };
    likeCountData?.isLiked ? await removeLike(likeData) : await addLike(likeData);
  };

  return (
    <div className="flex gap-1">
      <div onClick={handleUpdateLike}>{likeCountData?.isLiked ? "🩷" : "🤍"}</div>
      <div>좋아요</div>
      <div>{likeCountData ? `${likeCountData.likeCount}` : "0"}</div>
    </div>
  );
}

export default KnowhowLikes;
