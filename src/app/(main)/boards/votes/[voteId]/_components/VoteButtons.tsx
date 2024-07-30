"use client";

import { useState, useEffect } from "react";
import useVoteLikesQuery from "@/stores/queries/useVoteLikesQuery";
import { useUserContext } from "@/provider/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useModal } from "@/provider/contexts/ModalContext";
import useVoteLikeMutation from "@/stores/queries/useVoteLikeMutation";
import { TVoteLikeCountsResponse } from "@/types/vote.type";

type VoteButtonsProps = {
  voteId: number;
};

function VoteButtons({ voteId }: VoteButtonsProps) {
  const { user } = useUserContext();
  const { addVoteLike, updateVoteLike } = useVoteLikeMutation();
  const modal = useModal();
  const router = useRouter();

  const { data: voteData } = useVoteLikesQuery(voteId);

  const [voteType, setVoteType] = useState<"GOOD" | "BAD" | null>(null);
  const [optimisticVoteData, setOptimisticVoteData] = useState<TVoteLikeCountsResponse | null>(null);

  useEffect(() => {
    if (voteData?.userLikeStatus !== undefined) {
      if (voteData.userLikeStatus !== null) {
        setVoteType(voteData.userLikeStatus === "up_vote" ? "GOOD" : "BAD");
      } else {
        setVoteType(null);
      }
    }
    setOptimisticVoteData(voteData || null);
  }, [voteData]);

  const handleOpenModal = () =>
    modal.open({
      type: "confirm",
      content: "로그인 후 이용해 주세요.",
      onConfirm: () => router.push("/login")
    });

  const handleVote = async (type: "GOOD" | "BAD") => {
    if (!user) {
      handleOpenModal();
      return;
    }

    if (voteType === type) {
      return;
    }

    const newLikeData = {
      is_upvote: type === "GOOD",
      user_id: user.userId,
      vote_post_id: voteId
    };

    if (voteType === null) {
      setOptimisticVoteData((prevData) => {
        if (!prevData) return prevData;
        const newUpvoteCount = type === "GOOD" ? prevData.upvoteCount + 1 : prevData.upvoteCount;
        const newDownvoteCount = type === "BAD" ? prevData.downvoteCount + 1 : prevData.downvoteCount;
        const newTotalVoteCount = prevData.totalVoteCount + 1;
        return {
          ...prevData,
          upvoteCount: newUpvoteCount,
          downvoteCount: newDownvoteCount,
          totalVoteCount: newTotalVoteCount,
          userLikeStatus: type === "GOOD" ? "up_vote" : "down_vote"
        };
      });

      setVoteType(type);

      try {
        await addVoteLike(newLikeData);
      } catch (error) {
        if (voteData) {
          setOptimisticVoteData(voteData);
          setVoteType(
            voteData?.userLikeStatus === "up_vote" ? "GOOD" : voteData?.userLikeStatus === "down_vote" ? "BAD" : null
          );
        }
      }
    } else {
      await updateVoteLike(newLikeData);
    }
  };

  const upvotePercentage =
    optimisticVoteData && optimisticVoteData.totalVoteCount > 0
      ? (optimisticVoteData.upvoteCount / optimisticVoteData.totalVoteCount) * 100
      : 0;
  const downvotePercentage =
    optimisticVoteData && optimisticVoteData.totalVoteCount > 0
      ? (optimisticVoteData.downvoteCount / optimisticVoteData.totalVoteCount) * 100
      : 0;

  const upvoteCount = optimisticVoteData ? optimisticVoteData.upvoteCount : 0;
  const downvoteCount = optimisticVoteData ? optimisticVoteData.downvoteCount : 0;

  return (
    <div className="flex flex-col space-y-4">
      {voteType === null ? (
        <div className="flex space-x-4">
          <button className="px-4 py-2 rounded bg-gray-800 text-white" onClick={() => handleVote("GOOD")}>
            👍 GOOD
          </button>
          <button className="px-4 py-2 rounded bg-gray-800 text-white" onClick={() => handleVote("BAD")}>
            👎 BAD
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${voteType === "GOOD" ? "bg-green-500 text-white" : "bg-gray-800 text-white"}`}
            onClick={() => handleVote("GOOD")}
          >
            {`👍 ${upvotePercentage.toFixed(0)}% (${upvoteCount}명)`}
          </button>
          <button
            className={`px-4 py-2 rounded ${voteType === "BAD" ? "bg-green-500 text-white" : "bg-gray-800 text-white"}`}
            onClick={() => handleVote("BAD")}
          >
            {`👎 ${downvotePercentage.toFixed(0)}% (${downvoteCount}명)`}
          </button>
        </div>
      )}
    </div>
  );
}

export default VoteButtons;
