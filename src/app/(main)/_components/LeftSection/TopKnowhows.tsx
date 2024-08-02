"use client";

import useTopKnowhowQuery from "@/stores/queries/useTopKnowhowQuery";
import Image from "next/image";
import Link from "next/link";

function TopKnowhows() {
  const { data } = useTopKnowhowQuery();

  const backgrounds = ["/home/Knowhowbg1.png", "/home/Knowhowbg2.png", "/home/Knowhowbg3.png"];

  return (
    <div>
      <h3 className="text-xl mb-4">Best 짠노하우 💎</h3>
      <ul className="space-y-4">
        {data?.map((knowhow, index) => (
          <li key={knowhow.knowhow_postId} className="my-2">
            <Link href={`/boards/knowhow/${knowhow.knowhow_postId}`}>
              <div className="relative rounded-xl overflow-hidden h-40">
                <Image
                  src={backgrounds[index % backgrounds.length]}
                  alt={`Background ${index + 1}`}
                  layout="fill"
                  className="rounded-xl"
                />
                <div className="absolute bottom-0 left-0 pl-5 w-full">
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
