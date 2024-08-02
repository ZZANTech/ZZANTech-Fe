"use client";

import useTopKnowhowQuery from "@/stores/queries/useTopKnowhowQuery";
import Link from "next/link";

function TopKnowhows() {
  const { data } = useTopKnowhowQuery();

  return (
    <div>
      <h3 className="text-xl mb-4">Best 짠노하우 👑</h3>
      <ul className="space-y-4">
        {data?.map((knowhow) => (
          <li key={knowhow.knowhow_postId} className="my-2">
            <Link href={`/boards/knowhow/${knowhow.knowhow_postId}`}>
              <div className="bg-gray-700 rounded-xl">
                <div className="pt-20 pl-5">
                  <h6 className="text-lg text-white font-semibold">{knowhow.title}</h6>
                  <p className="text-white pb-5">{knowhow.nickname}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopKnowhows;
