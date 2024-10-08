import { deleteKnowhowLike, postKnowhowLike } from "@/apis/knowhow";
import useAlertModal from "@/hooks/useAlertModal";
import { TKnowhowLikesCountResponse, TResponseStatus, TUpdateKnowhowLikeParams } from "@/types/knowhow.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useKnowhowLikeMutation = () => {
  const { displayDefaultAlert } = useAlertModal();
  const queryClient = useQueryClient();

  const { mutateAsync: updateLike } = useMutation<
    TResponseStatus,
    Error,
    TUpdateKnowhowLikeParams,
    { previousLikes?: TKnowhowLikesCountResponse }
  >({
    mutationFn: async ({ likeData, likeCountData }) => {
      if (likeCountData.isLiked) {
        return deleteKnowhowLike(likeData);
      } else {
        return postKnowhowLike(likeData);
      }
    },
    onMutate: async ({ likeData, likeCountData }) => {
      const knowhowId = likeData.knowhow_post_id;
      const userId = likeData.user_id;

      await queryClient.cancelQueries({ queryKey: ["knowhowLikes", { knowhowId }] });
      await queryClient.cancelQueries({ queryKey: ["likedKnowhows", { page: 1, limit: 5, userId }] });

      const previousLikes = queryClient.getQueryData<TKnowhowLikesCountResponse>(["knowhowLikes", { knowhowId }]);

      if (previousLikes) {
        queryClient.setQueryData<TKnowhowLikesCountResponse>(["knowhowLikes", { knowhowId }], {
          likeCount: likeCountData.isLiked ? previousLikes.likeCount - 1 : previousLikes.likeCount + 1,
          isLiked: !likeCountData.isLiked
        });
      }

      return { previousLikes };
    },
    onError: (err, { likeData }, context) => {
      const knowhowId = likeData.knowhow_post_id;

      if (context?.previousLikes) {
        queryClient.setQueryData<TKnowhowLikesCountResponse>(["knowhowLikes", { knowhowId }], context.previousLikes);
      }
      displayDefaultAlert(err.message);
    },
    onSettled: (status, error, { likeData }) => {
      const knowhowId = likeData.knowhow_post_id?.toString();
      const userId = likeData.user_id;

      queryClient.invalidateQueries({ queryKey: ["knowhowLikes", { knowhowId }] });
      queryClient.invalidateQueries({ queryKey: ["likedKnowhows", { page: 1, limit: 5, userId }] });
    }
  });

  return { updateLike };
};

export default useKnowhowLikeMutation;
