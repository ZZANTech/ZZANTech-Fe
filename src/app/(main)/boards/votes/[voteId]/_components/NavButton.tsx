"use client";

import { TVoteWithNavigation } from "@/types/vote.type";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

type NavButtonProps = {
  vote: TVoteWithNavigation;
  direction: "next" | "prev";
};

function NavButton({ vote, direction }: NavButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortOrder = searchParams.get("sortOrder") || "latest";
  const targetVoteId = direction === "next" ? vote.nextVoteId : vote.prevVoteId;
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (targetVoteId) {
      router.push(`/boards/votes/${targetVoteId}?sortOrder=${sortOrder}`);
    }
  };

  const getImageSrc = () => {
    const directionStr = direction === "next" ? "right" : "left";
    const state = !targetVoteId ? "nonactive" : isHovered ? "hover" : "Default";

    return `/icons/vote/direction=${directionStr}, state=${state}.png`;
  };

  const buttonClass = direction === "next" ? "ml-7" : "mr-7";

  return (
    <div className={`hidden md:block ${buttonClass}`}>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={!targetVoteId}
      >
        <Image src={getImageSrc()} alt={`${direction} navigation`} width={74} height={74} className="object-contain" />
      </button>
    </div>
  );
}

export default NavButton;
