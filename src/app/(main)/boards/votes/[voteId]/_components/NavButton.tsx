"use client";

import { TVoteWithNavigation } from "@/types/vote.type";
import { useRouter, useSearchParams } from "next/navigation";

type NavButtonProps = {
  vote: TVoteWithNavigation;
  direction: "next" | "prev";
};

function NavButton({ vote, direction }: NavButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortOrder = searchParams.get("sortOrder") || "latest";

  const targetVoteId = direction === "next" ? vote.nextVoteId : vote.prevVoteId;

  const handleClick = () => {
    if (targetVoteId) {
      router.push(`/boards/votes/${targetVoteId}?sortOrder=${sortOrder}`);
    }
  };

  return (
    <button
      className={`w-[74px] h-[74px] relative rounded-[74px] border border-[#1b1b1b] ${
        targetVoteId ? "bg-white" : "bg-gray-300"
      }`}
      onClick={handleClick}
      disabled={!targetVoteId}
    >
      {direction === "next" ? (
        <div className="w-[15px] h-[15px] left-[35px] top-[26.39px] absolute origin-top-left rotate-45 border-r border-t border-[#1b1b1b]" />
      ) : (
        <div className="w-[15px] h-[15px] left-[39px] top-[47.61px] absolute origin-top-left rotate-[-135deg] border-r border-t border-[#1b1b1b]" />
      )}
    </button>
  );
}

export default NavButton;
