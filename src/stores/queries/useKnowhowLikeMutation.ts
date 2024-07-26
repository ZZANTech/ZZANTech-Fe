import { deleteKnowhowLike, postKnowhowLike } from "@/apis/knowhow";
import useAlertModal from "@/hooks/useAlertModal";
import { TKnowhowLikesCountResponse, TResponseStatus } from "@/types/knowhow.type";
import { Tables } from "@/types/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useKnowhowLikeMutation = () => {
  const { displayDefaultAlert } = useAlertModal();
  const queryClient = useQueryClient();

  const { mutateAsync: addLike } = useMutation<
    TResponseStatus,
    Error,
    Partial<Tables<"knowhow_likes">>,
    { previousLikes?: TKnowhowLikesCountResponse }
  >({
    mutationFn: (likeData) => postKnowhowLike(likeData),
    onMutate: async (newLike) => {
      const knowhowId = newLike.knowhow_post_id;

      await queryClient.cancelQueries({ queryKey: ["knowhowLikes", { knowhowId }] });

      const previousLikes = queryClient.getQueryData<TKnowhowLikesCountResponse>(["knowhowLikes", { knowhowId }]);

      if (previousLikes) {
        queryClient.setQueryData<TKnowhowLikesCountResponse>(["knowhowLikes", { knowhowId }], {
          likeCount: previousLikes.isLiked ? previousLikes.likeCount - 1 : previousLikes.likeCount + 1,
          isLiked: !previousLikes.isLiked
        });
      }

      return { previousLikes };
    },
    onError: (err, newLike, context) => {
      const knowhowId = newLike.knowhow_post_id;
      console.log(context);

      if (context?.previousLikes) {
        queryClient.setQueryData<TKnowhowLikesCountResponse>(["knowhowLikes", { knowhowId }], context.previousLikes);
      }
      displayDefaultAlert(err.message);
    },
    onSettled: (status, error, newLike) => {
      const knowhowId = newLike.knowhow_post_id;

      queryClient.invalidateQueries({ queryKey: ["knowhowLikes", { knowhowId }] });
    }
  });

  const { mutateAsync: removeLike } = useMutation<
    TResponseStatus,
    Error,
    Partial<Tables<"knowhow_likes">>,
    { previousLikes?: TKnowhowLikesCountResponse }
  >({
    mutationFn: (likeData) => deleteKnowhowLike(likeData),
    onMutate: async (newLike) => {
      const knowhowId = newLike.knowhow_post_id;

      await queryClient.cancelQueries({ queryKey: ["knowhowLikes", { knowhowId }] });

      const previousLikes = queryClient.getQueryData<TKnowhowLikesCountResponse>(["knowhowLikes", { knowhowId }]);

      if (previousLikes) {
        queryClient.setQueryData<TKnowhowLikesCountResponse>(["knowhowLikes", { knowhowId }], {
          likeCount: previousLikes.isLiked ? previousLikes.likeCount - 1 : previousLikes.likeCount + 1,
          isLiked: !previousLikes.isLiked
        });
      }

      return { previousLikes };
    },
    onError: (err, newLike, context) => {
      const knowhowId = newLike.knowhow_post_id;
      console.log(context);

      if (context?.previousLikes) {
        queryClient.setQueryData<TKnowhowLikesCountResponse>(["knowhowLikes", { knowhowId }], context.previousLikes);
      }
      displayDefaultAlert(err.message);
    },
    onSettled: (status, error, newLike) => {
      const knowhowId = newLike.knowhow_post_id;

      queryClient.invalidateQueries({ queryKey: ["knowhowLikes", { knowhowId }] });
    }
  });

  return { addLike, removeLike };
};

export default useKnowhowLikeMutation;
