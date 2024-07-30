"use client";

import useTopVotesQuery from "@/stores/queries/useTopVotesQuery";
import Image from "next/image";
import { dehydrate } from "@tanstack/react-query";
import Link from "next/link";

function TopVotes() {
  const { data } = useTopVotesQuery();
  data && console.log(data);
  return (
    <>
      <h3 className="text-xl font-semibold mt-14 mb-4">이번주 소비왕 🏆</h3>
      <div className="flex gap-4 justify-center">
        {data?.map((vote) => (
          <Link
            href={`/boards/votes/${vote.vote_postId}`}
            key={vote.vote_postId}
            className="flex-grow sm:flex-grow-0 sm:basis-[calc(50%-1rem)] md:basis-[calc(33.333%-1rem)] lg:basis-[calc(25%-1rem)] max-w-[700px] p-2"
          >
            <div className="bg-white rounded-lg h-full">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image alt={vote.title} src={vote.image_url} fill className="object-cover" />
                <div className="absolute bottom-0 left-0 w-full text-white pl-5 py-2">
                  <h6 className="text-sm">{vote.title}</h6>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">{vote.nickname}</p>
                <div className="flex">
                  <Image src="/icons/eye.png" alt="eye" width={20} height={20} />
                  <p className="text-sm">{vote.votes_count}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default TopVotes;
