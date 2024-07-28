"use client";

import { useState, useEffect } from "react";
import useVoteLikesQuery from "@/stores/queries/useVoteLikesQuery";
import { useUserContext } from "@/provider/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useModal } from "@/provider/contexts/ModalContext";

type VoteButtonsProps = {
  voteId: number;
};

function VoteButtons({ voteId }: VoteButtonsProps) {
  const { user } = useUserContext();
  const modal = useModal();
  const router = useRouter();

  const { data: voteData } = useVoteLikesQuery(voteId);

  const [isLike, setIsLike] = useState<boolean | null>(null);
  const [voteType, setVoteType] = useState<"GOOD" | "BAD" | null>(null);

  const handleOpenModal = () =>
    modal.open({
      type: "confirm",
      content: "로그인 후 이용해 주세요.",
      onConfirm: () => router.push("/login")
    });

  useEffect(() => {
    if (voteData?.userLikeStatus !== undefined) {
      setIsLike(voteData.userLikeStatus);
      setVoteType(voteData.userLikeStatus ? "GOOD" : "BAD");
    }
  }, [voteData?.userLikeStatus]);

  const handleVote = (type: "GOOD" | "BAD") => {
    if (!user) {
      handleOpenModal();
      return;
    }
    const isUpvote = type === "GOOD";
    setIsLike(isUpvote);
    setVoteType(type);
  };

  const upvotePercentage = voteData ? (voteData.upvoteCount / voteData.totalVoteCount) * 100 : 0;
  const downvotePercentage = voteData ? (voteData.downvoteCount / voteData.totalVoteCount) * 100 : 0;

  const upvoteCount = voteData ? voteData.upvoteCount : 0;
  const downvoteCount = voteData ? voteData.downvoteCount : 0;

  return (
    <div className="flex flex-col space-y-4">
      {voteType ? (
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${voteType === "GOOD" ? "bg-green-500 text-white" : "bg-gray-800 text-white"}`}
            onClick={() => handleVote("GOOD")}
          >
            {`${upvotePercentage.toFixed(1)}% (${upvoteCount}명)`}
          </button>
          <button
            className={`px-4 py-2 rounded ${voteType === "BAD" ? "bg-green-500 text-white" : "bg-gray-800 text-white"}`}
            onClick={() => handleVote("BAD")}
          >
            {`${downvotePercentage.toFixed(1)}% (${downvoteCount}명)`}
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <button className="px-4 py-2 rounded bg-gray-800 text-white" onClick={() => handleVote("GOOD")}>
            👍 GOOD
          </button>
          <button className="px-4 py-2 rounded bg-gray-800 text-white" onClick={() => handleVote("BAD")}>
            👎 BAD
          </button>
        </div>
      )}
    </div>
  );
}

export default VoteButtons;
