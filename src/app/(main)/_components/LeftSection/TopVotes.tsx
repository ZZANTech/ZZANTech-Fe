"use client";

import useTopVotesQuery from "@/stores/queries/useTopVotesQuery";
import Image from "next/image";
import { dehydrate } from "@tanstack/react-query";

function TopVotes() {
  const { data } = useTopVotesQuery();
  data && console.log(data);
  return (
    <>
      <h3 className="text-xl font-bold">이번주 소비왕 🏆</h3>
      <div className="flex space-x-3">
        {data?.map((vote) => (
          <div key={vote.vote_postId} className="bg-white rounded-lg w-56">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image alt={vote.title} src={vote.image_url} fill className="object-cover" />
              <div className="absolute bottom-0 left-0 w-full text-white pl-5 py-2">
                <h6 className="text-sm">{vote.title}</h6>
              </div>
            </div>
            <div>
              <p className="text-sm">{vote.nickname}</p>
              <div className="flex items-center mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TopVotes;
