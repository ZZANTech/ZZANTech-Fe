"use client";

import { useState, useEffect } from "react";
import useVoteLikesQuery from "@/stores/queries/vote/like/useVoteLikesQuery";
import { useUserContext } from "@/provider/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useModal } from "@/provider/contexts/ModalContext";
import useVoteLikeMutation from "@/stores/queries/vote/like/useVoteLikeMutation";
import { TVoteLikeCountsResponse } from "@/types/vote.type";
import Button from "@/components/Button/Button";
import Image from "next/image";
import useAlertModal from "@/hooks/useAlertModal";

type VoteButtonsProps = {
  voteId: number;
};

function VoteButtons({ voteId }: VoteButtonsProps) {
  const { user } = useUserContext();
  const { displayLoginAlert } = useAlertModal();
  const { addVoteLike, updateVoteLike } = useVoteLikeMutation();
  const modal = useModal();
  const router = useRouter();

  const { data: voteData, isPending } = useVoteLikesQuery(voteId);

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

  const handleVote = async (type: "GOOD" | "BAD") => {
    if (isPending) {
      return;
    }
    if (!user) {
      displayLoginAlert();
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
    <div className="self-stretch h-[76px] justify-between items-center inline-flex">
      {voteType === null ? (
        <>
          <Button
            className="w-[212px] h-[76px] px-[55px] py-[26px] bg-basic rounded-xl justify-center items-center inline-flex text-white text-xl font-semibold"
            onClick={() => handleVote("GOOD")}
          >
            <Image src="/icons/vote/upvote.png" alt="Upvote icon" width={32} height={32} className="mr-2" />
            GOOD
          </Button>
          <Button
            className="w-[212px] h-[76px] px-[55px] py-[26px] bg-basic rounded-xl justify-center items-center inline-flex text-white text-xl font-semibold"
            onClick={() => handleVote("BAD")}
          >
            <Image src="/icons/vote/downvote.png" alt="Downvote icon" width={32} height={32} className="mr-2" />
            BAD
          </Button>
        </>
      ) : (
        <>
          <button
            className={`w-[212px] h-[76px] px-[55px] py-[26px] rounded-xl justify-center items-center inline-flex text-xl font-semibold ${voteType === "GOOD" ? "bg-[#e1ff49] text-[#121212]" : "bg-basic text-[#b3b3b3]"}`}
            onClick={() => handleVote("GOOD")}
          >
            {`${upvotePercentage.toFixed(0)}% (${upvoteCount}명)`}
          </button>
          <button
            className={`w-[212px] h-[76px] px-[55px] py-[26px] rounded-xl justify-center items-center inline-flex text-xl font-semibold ${voteType === "BAD" ? "bg-[#e1ff49] text-[#121212]" : "bg-basic text-[#b3b3b3]"}`}
            onClick={() => handleVote("BAD")}
          >
            {`${downvotePercentage.toFixed(0)}% (${downvoteCount}명)`}
          </button>
        </>
      )}
    </div>
  );
}

export default VoteButtons;
