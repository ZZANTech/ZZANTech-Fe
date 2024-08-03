"use client";

import useTopVotesQuery from "@/stores/queries/useTopVotesQuery";
import Image from "next/image";
import Link from "next/link";

function TopVotes() {
  const { data } = useTopVotesQuery();

  return (
    <>
      <h3 className="text-xl font-semibold mt-14 mb-4">이번주 소비왕 🏆</h3>
      <ul className="flex w-full justify-between space-x-3">
        {data?.map((vote) => (
          <li key={vote.vote_postId} className="flex-1 transition duration-300 ease-in-out hover:scale-105">
            <Link href={`/boards/votes/${vote.vote_postId}`}>
              <div className="flex flex-col h-full">
                <div className="relative w-full pb-[75%] overflow-hidden rounded-xl">
                  <Image src={vote.image_url} alt={vote.title} layout="fill" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 text-white w-full pl-4 pb-3">
                    <h6 className="font-semibold">{vote.title}</h6>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm">{vote.nickname}</p>
                  <div className="flex items-center">
                    <Image src="/icons/eye.png" alt="eye" width={20} height={20} />
                    <p className="text-sm ml-3">{vote.votes_count}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TopVotes;
