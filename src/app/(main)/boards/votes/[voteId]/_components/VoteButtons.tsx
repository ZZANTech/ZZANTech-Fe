"use client";

import { useState } from "react";
import useVoteLikesQuery from "@/stores/queries/useVoteLikesQuery";

type VoteButtonsProps = {
  voteId: number;
};

function VoteButtons({ voteId }: VoteButtonsProps) {
  const { data: counts } = useVoteLikesQuery(voteId);
  const [isLike, setIsLike] = useState<boolean | null>(null);
  const [voteType, setVoteType] = useState<"GOOD" | "BAD" | null>(null);

  const handleVote = (type: "GOOD" | "BAD") => {
    if (voteType !== type) {
      setIsLike(true);
      setVoteType(type);
    }
  };

  const upvotePercentage = counts ? (counts.upvoteCount / counts.totalVoteCount) * 100 : 0;
  const dounvotePercentage = counts ? (counts.downvoteCount / counts.totalVoteCount) * 100 : 0;

  const upvoteCount = counts ? counts.upvoteCount : 0;
  const downvoteCount = counts ? counts.downvoteCount : 0;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${voteType === "GOOD" ? "bg-green-500 text-white" : "bg-gray-800 text-white"}`}
          onClick={() => handleVote("GOOD")}
        >
          {voteType === "GOOD" ? `${upvotePercentage}%(${upvoteCount}명)` : "👍 GOOD"}
        </button>
        <button
          className={`px-4 py-2 rounded ${voteType === "BAD" ? "bg-green-500 text-white" : "bg-gray-800 text-white"}`}
          onClick={() => handleVote("BAD")}
        >
          {voteType === "BAD" ? `${dounvotePercentage}%(${downvoteCount}명)` : "👎 BAD"}
        </button>
      </div>
    </div>
  );
}

export default VoteButtons;
