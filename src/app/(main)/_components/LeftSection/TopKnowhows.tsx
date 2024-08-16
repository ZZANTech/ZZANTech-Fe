"use client";

import SkeletonKnowhow from "@/app/(main)/_components/LeftSection/SkeletonKnowhow";
import useTopKnowhowQuery from "@/stores/queries/useTopKnowhowQuery";
import Image from "next/image";
import Link from "next/link";

function TopKnowhows() {
  const { data, isPending } = useTopKnowhowQuery();

  const backgrounds = ["/home/KnowhowIcon1.png", "/home/KnowhowIcon2.png", "/home/KnowhowIcon3.png"];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Image src="/home/crown2.png" alt="crown" width={25} height={23} className="mr-2" />
        Best 짠노하우
      </h3>
      <ul className="space-y-4">
        {isPending
          ? Array.from({ length: 3 }).map((_, index) => <SkeletonKnowhow key={index} />)
          : data?.map((knowhow, index) => (
              <li key={knowhow.knowhow_postId} className="my-2 transition duration-300 ease-in-out hover:scale-105">
                <Link href={`/boards/knowhow/${knowhow.knowhow_postId}`}>
                  <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-center rounded-xl w-full aspect-[11/10] lg:aspect-auto lg:h-40 bg-ivory lg:px-8 custom-box-shadow">
                    <div className="flex flex-col w-full lg:w-4/5 flex-1 lg:flex-none justify-center px-[16px] lg:px-0">
                      <h6 className="text-xl text-gray-900 font-semibold">{knowhow.title}</h6>
                      <hr className="w-full lg:w-[440px] my-2 border-gray-900 mt-2 mb-1" />
                      <p className="text-gray-900">{knowhow.nickname}</p>
                    </div>
                    <div className="relative w-full min-h-[152px] lg:min-h-0  lg:w-[120px] lg:h-[120px] lg:mb-0 flex-[1.5] lg:flex-none">
                      <Image
                        src={backgrounds[index % backgrounds.length]}
                        alt={`Background ${index + 1}`}
                        fill
                        className="lg:object-cover lg:rounded-full object-fill rounded-t-lg"
                      />
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
