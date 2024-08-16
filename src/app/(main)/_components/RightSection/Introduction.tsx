import clsx from "clsx";
import Image from "next/image";
import React from "react";

function Introduction() {
  const items = [
    { bgColor: "bg-point", fontColor: "text-gray-50", text: "ZZAN\nFAMILY" },
    {
      bgColor: "bg-black",
      fontColor: "text-ivory",
      text: "알뜰 살뜰 전략가\n티끌이",
      imageUrl: "/home/tigglechar.png"
    },
    { bgColor: "bg-black", fontColor: "text-ivory", text: "제테크 매니아\n모아", imageUrl: "/home/moachar.png" },
    { bgColor: "bg-black", fontColor: "text-ivory", text: "충동구매 소비왕\n태산이", imageUrl: "/home/taesanchar.png" }
  ];

  return (
    <div className="mx-auto">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold flex justify-start">
          <Image src="/home/zzanFamilyIcon.png" alt="clover" width={27} height={24} className="mr-2" /> 짠테크 매거진
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3 ">
        {items.map((item, index) => (
          <div
            key={index}
            className={clsx(
              item.bgColor,
              "rounded-xl p-4 flex flex-col justify-between aspect-square relative",
              index === 0 && "text-2xl font-extrabold whitespace-pre-line pt-7"
            )}
          >
            <div className="z-index-20">
              {item.text.split("\n").map((line, lineIndex) => (
                <p
                  key={lineIndex}
                  className={clsx(item.fontColor, index === 0 ? "text-2xl" : lineIndex === 0 ? "text-sm" : "text-xl")}
                >
                  {line}
                </p>
              ))}
            </div>
            {item.imageUrl && (
              <div className="absolute bottom-5 right-4 max-w-28 max-h-28 min-w-20 min-h-20 z-index-10">
                <Image src={item.imageUrl} alt={`Image for ${item.text}`} fill className="object-fill" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Introduction;
