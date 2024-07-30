"use client";
import { patchVoteLikeData, postVoteLikeData } from "@/apis/votes"; // PATCH 제거
import useAlertModal from "@/hooks/useAlertModal";
import { Tables } from "@/types/supabase";
import { TVoteLikeCountsResponse } from "@/types/vote.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useVoteLikeMutation = () => {
  const { displayDefaultAlert } = useAlertModal();
  const queryClient = useQueryClient();

  const { mutateAsync: addVoteLike } = useMutation<
    void,
    Error,
    Partial<Tables<"vote_likes">>,
    { previousVoteData?: Partial<TVoteLikeCountsResponse> }
  >({
    mutationFn: async (newLikeData) => {
      // 초기 투표에 대해서만 postVoteLikeData를 호출
      return postVoteLikeData(newLikeData);
    },
    onMutate: async (newLikeData) => {
      const queryKey = ["voteLikes", { voteId: newLikeData.vote_post_id }];

      await queryClient.cancelQueries({ queryKey });

      const previousVoteData = queryClient.getQueryData<TVoteLikeCountsResponse>(queryKey);

      if (previousVoteData) {
        queryClient.setQueryData<TVoteLikeCountsResponse>(queryKey, {
          ...previousVoteData,
          upvoteCount: newLikeData.is_upvote ? previousVoteData.upvoteCount + 1 : previousVoteData.upvoteCount,
          downvoteCount: !newLikeData.is_upvote ? previousVoteData.downvoteCount + 1 : previousVoteData.downvoteCount,
          totalVoteCount: previousVoteData.totalVoteCount + 1,
          userLikeStatus: newLikeData.is_upvote ? "up_vote" : "down_vote"
        });
      }

      return { previousVoteData };
    },
    onError: (error, newLikeData, context) => {
      const queryKey = ["voteLikes", { voteId: newLikeData.vote_post_id }];

      if (context?.previousVoteData) {
        queryClient.setQueryData(queryKey, context.previousVoteData);
      }
      displayDefaultAlert(error.message);
    },
    onSettled: (data, error, newLikeData) => {
      console.log(newLikeData);
      const queryKey = ["voteLikes", { voteId: newLikeData.vote_post_id }];
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const { mutateAsync: updateVoteLike } = useMutation<
    void,
    Error,
    Partial<Tables<"vote_likes">>,
    { previousVoteData?: Partial<TVoteLikeCountsResponse> }
  >({
    mutationFn: async (newLikeData) => {
      // 초기 투표에 대해서만 postVoteLikeData를 호출
      return patchVoteLikeData(newLikeData);
    },
    onMutate: async (newLikeData) => {
      const queryKey = ["voteLikes", { voteId: newLikeData.vote_post_id }];

      await queryClient.cancelQueries({ queryKey });

      const previousVoteData = queryClient.getQueryData<TVoteLikeCountsResponse>(queryKey);

      if (previousVoteData) {
        queryClient.setQueryData<TVoteLikeCountsResponse>(queryKey, {
          ...previousVoteData,
          upvoteCount: newLikeData.is_upvote ? previousVoteData.upvoteCount + 1 : previousVoteData.upvoteCount,
          downvoteCount: !newLikeData.is_upvote ? previousVoteData.downvoteCount + 1 : previousVoteData.downvoteCount,
          totalVoteCount: previousVoteData.totalVoteCount + 1,
          userLikeStatus: newLikeData.is_upvote ? "up_vote" : "down_vote"
        });
      }

      return { previousVoteData };
    },
    onError: (error, newLikeData, context) => {
      const queryKey = ["voteLikes", { voteId: newLikeData.vote_post_id }];

      if (context?.previousVoteData) {
        queryClient.setQueryData(queryKey, context.previousVoteData);
      }
      displayDefaultAlert(error.message);
    },
    onSettled: (data, error, newLikeData) => {
      console.log(newLikeData);
      const queryKey = ["voteLikes", { voteId: newLikeData.vote_post_id }];
      queryClient.invalidateQueries({ queryKey });
    }
  });
  return { addVoteLike, updateVoteLike };
};

export default useVoteLikeMutation;
