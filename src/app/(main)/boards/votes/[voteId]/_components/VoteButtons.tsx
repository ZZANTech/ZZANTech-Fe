"use client";

import { useState } from "react";

function VoteButtons() {
  const [isLike, setIsLike] = useState<boolean>(true);
  const [voteType, setVoteType] = useState<"GOOD" | "BAD" | null>(null);

  const handleVote = (type: "GOOD" | "BAD") => {
    if (voteType !== type) {
      setIsLike(true);
      setVoteType(type);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        className={`px-4 py-2 rounded ${voteType === "GOOD" ? "bg-green-500 text-white" : "bg-gray-800 text-white"}`}
        onClick={() => handleVote("GOOD")}
      >
        {isLike ? "투표 완료" : "👍 GOOD"}
      </button>
      <button
        className={`px-4 py-2 rounded ${voteType === "BAD" ? "bg-green-500 text-white" : "bg-gray-800 text-white"}`}
        onClick={() => handleVote("BAD")}
      >
        {isLike ? "투표 완료" : "👎 BAD"}
      </button>
    </div>
  );
}

export default VoteButtons;
