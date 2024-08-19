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
      let newUpvoteCount = prevData.upvoteCount;
      let newDownvoteCount = prevData.downvoteCount;
      let newTotalVoteCount = prevData.totalVoteCount;

      if (voteType === null) {
        newTotalVoteCount += 1;
      } else {
        if (voteType === "GOOD") {
          newUpvoteCount -= 1;
        } else if (voteType === "BAD") {
          newDownvoteCount -= 1;
        }
      }

      if (type === "GOOD") {
        newUpvoteCount += 1;
      } else {
        newDownvoteCount += 1;
      }

      return {
        ...prevData,
        upvoteCount: newUpvoteCount,
        downvoteCount: newDownvoteCount,
        totalVoteCount: newTotalVoteCount,
        userLikeStatus: type === "GOOD" ? "up_vote" : "down_vote"
      };
    };

    setOptimisticVoteData((prevData) => {
      if (prevData) {
        return updateVoteData(prevData);
      }
      return {
        upvoteCount: type === "GOOD" ? 1 : 0,
        downvoteCount: type === "BAD" ? 1 : 0,
        totalVoteCount: 1,
        userLikeStatus: type === "GOOD" ? "up_vote" : "down_vote"
      };
    });
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
    optimisticVoteData && optimisticVoteData.totalVoteCount > 0
      ? (optimisticVoteData.upvoteCount / optimisticVoteData.totalVoteCount) * 100
      : 0;
  const downvotePercentage =
    optimisticVoteData && optimisticVoteData.totalVoteCount > 0
      ? (optimisticVoteData.downvoteCount / optimisticVoteData.totalVoteCount) * 100
      : 0;

  const upvoteCount = optimisticVoteData.upvoteCount;
  const downvoteCount = optimisticVoteData.downvoteCount;

  useEffect(() => {
    return () => {
      (async () => await refetch())();
    };
  }, []);

  return (
    <div className="self-stretch flex justify-between items-center gap-4">
      {voteType === null ? (
        <>
          <Button
            variant="trueBlack"
            size="xl"
            textSize="xl"
            weight="semibold"
            onClick={() => handleVote("GOOD")}
            className="flex-1 h-[60px] md:h-[76px] rounded-xl shadow flex items-center justify-center min-w-[120px] md:min-w-[150px]"
          >
            <Image src="/icons/vote/upvote.png" alt="GOOD 이미지" width={32} height={32} className="mr-2" />
            GOOD
          </Button>

          <Button
            variant="trueBlack"
            size="xl"
            textSize="xl"
            weight="semibold"
            onClick={() => handleVote("BAD")}
            className="flex-1 h-[60px] md:h-[76px] rounded-xl shadow flex items-center justify-center min-w-[120px] md:min-w-[150px]"
          >
            <Image src="/icons/vote/downvote.png" alt="BAD 이미지" width={32} height={32} className="mr-2" />
            BAD
          </Button>
        </>
      ) : (
        <>
          <Button
            variant={voteType === "GOOD" ? "main" : "trueBlack"}
            size="xl"
            textSize="xl"
            weight="semibold"
            className={`flex-1 h-[60px] md:h-[76px] px-0 py-0 rounded-xl shadow flex items-center justify-center min-w-[120px] md:min-w-[150px] ${
              voteType === "GOOD" ? "text-gray-900" : "text-gray-300"
            }`}
            onClick={() => handleVote("GOOD")}
          >
            {`${upvotePercentage.toFixed(0)}% (${upvoteCount}명)`}
          </Button>

          <Button
            variant={voteType === "BAD" ? "main" : "trueBlack"}
            size="xl"
            textSize="xl"
            weight="semibold"
            className={`flex-1 h-[60px] md:h-[76px] px-0 py-0 rounded-xl shadow flex items-center justify-center min-w-[120px] md:min-w-[150px] ${
              voteType === "BAD" ? "text-gray-900" : "text-gray-300"
            }`}
            onClick={() => handleVote("BAD")}
          >
            {`${downvotePercentage.toFixed(0)}% (${downvoteCount}명)`}
          </Button>
        </>
      )}
    </div>
  );
}

export default VoteButtons;
