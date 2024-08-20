"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "@/provider/contexts/UserContext";
import useVoteLikeMutation from "@/stores/queries/vote/like/useVoteLikeMutation";
import { TVoteLikeCountsResponse } from "@/types/vote.type";
import Button from "@/components/Button/Button";
import Image from "next/image";
import useAlertModal from "@/hooks/useAlertModal";
import useVoteLikesQuery from "@/stores/queries/vote/like/useVoteLikesQuery";

type VoteButtonsProps = {
  voteId: number;
  initialVoteLikes: TVoteLikeCountsResponse;
  accessToken: string;
  refreshToken: string;
};

function VoteButtons({ voteId, initialVoteLikes, accessToken, refreshToken }: VoteButtonsProps) {
  const { user } = useUserContext();
  const { data: voteLikes, refetch } = useVoteLikesQuery(voteId, initialVoteLikes, accessToken, refreshToken);
  const { displayLoginAlert } = useAlertModal();
  const { addVoteLike, updateVoteLike } = useVoteLikeMutation();

  const [voteType, setVoteType] = useState<"GOOD" | "BAD" | null>(null);
  const [optimisticVoteData, setOptimisticVoteData] = useState<TVoteLikeCountsResponse>(voteLikes);
  useEffect(() => {
    if (voteLikes.userLikeStatus) {
      setVoteType(voteLikes.userLikeStatus === "up_vote" ? "GOOD" : "BAD");
    }
    setOptimisticVoteData(voteLikes);
  }, [voteLikes]);

  const handleVote = async (type: "GOOD" | "BAD") => {
    if (voteType === type) return;

    if (!user) {
      displayLoginAlert();
      return;
    }

    const newLikeData = {
      is_upvote: type === "GOOD",
      user_id: user.userId,
      vote_post_id: voteId
    };

    const updateVoteData = (prevData: TVoteLikeCountsResponse): TVoteLikeCountsResponse => {
      const newUpvoteCount = prevData.upvoteCount + (type === "GOOD" ? 1 : voteType === "GOOD" ? -1 : 0);
      const newDownvoteCount = prevData.downvoteCount + (type === "BAD" ? 1 : voteType === "BAD" ? -1 : 0);
      const newTotalVoteCount = prevData.totalVoteCount + (voteType === null ? 1 : 0);

      return {
        ...prevData,
        upvoteCount: newUpvoteCount,
        downvoteCount: newDownvoteCount,
        totalVoteCount: newTotalVoteCount,
        userLikeStatus: type === "GOOD" ? "up_vote" : "down_vote"
      };
    };

    setOptimisticVoteData((prevData) => (prevData ? updateVoteData(prevData) : initialVoteLikes));
    setVoteType(type);

    try {
      if (voteType === null) {
        await addVoteLike(newLikeData);
      } else {
        await updateVoteLike(newLikeData);
      }
    } catch (error) {
      console.error("투표 요청 중 오류 발생:", error);
      setOptimisticVoteData(voteLikes);
      setVoteType(
        voteLikes.userLikeStatus === "up_vote" ? "GOOD" : voteLikes.userLikeStatus === "down_vote" ? "BAD" : null
      );
    }
  };

  const upvotePercentage =
    optimisticVoteData.totalVoteCount > 0
      ? (optimisticVoteData.upvoteCount / optimisticVoteData.totalVoteCount) * 100
      : 0;
  const downvotePercentage =
    optimisticVoteData.totalVoteCount > 0
      ? (optimisticVoteData.downvoteCount / optimisticVoteData.totalVoteCount) * 100
      : 0;

  const renderButton = (type: "GOOD" | "BAD", percentage: number, count: number, icon: string, label: string) => (
    <Button
      variant={voteType === type ? "main" : "trueBlack"}
      size="xl"
      textSize="xl"
      weight="semibold"
      className={`flex-1 h-[60px] md:h-[76px] px-0 py-0 rounded-xl shadow flex items-center justify-center min-w-[120px] md:min-w-[150px] ${
        voteType === type ? "text-gray-900" : "text-gray-300"
      }`}
      onClick={() => handleVote(type)}
    >
      {voteType === null ? (
        <>
          <Image src={icon} alt={`${label} 이미지`} width={32} height={32} className="mr-2" />
          {label}
        </>
      ) : (
        `${percentage.toFixed(0)}% (${count}명)`
      )}
    </Button>
  );

  useEffect(() => {
    return () => {
      (async () => await refetch())();
    };
  }, []);

  return (
    <div className="self-stretch flex justify-between items-center gap-4">
      {renderButton("GOOD", upvotePercentage, optimisticVoteData.upvoteCount, "/icons/vote/upvote.png", "GOOD")}
      {renderButton("BAD", downvotePercentage, optimisticVoteData.downvoteCount, "/icons/vote/downvote.png", "BAD")}
    </div>
  );
}

export default VoteButtons;
