import Image from "next/image";
import Link from "next/link";
import React from "react";

function Magazine() {
  const items = [
    { bgColor: "bg-gray-600", fontColor: "text-[#ffffff]", text: "준비중이에요", link: "#" },
    { bgColor: "bg-point", fontColor: "text-[#292929]", text: "준비중이에요", link: "#" },
    { bgColor: "bg-point", fontColor: "text-[#292929]", text: "준비중이에요", link: "#" },
    { bgColor: "bg-gray-600", fontColor: "text-[#ffffff]", text: "준비중이에요", link: "#" }
  ];

  return (
    <div className="mx-auto">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold">📚 짠테크 매거진</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, index) => (
          <Link key={index} href={item.link}>
            <div className={`${item.bgColor} rounded-[4px] p-4 flex flex-col justify-between aspect-square`}>
              <div>
                <p className={`${item.fontColor}`}>{item.text}</p>
              </div>
              <div className="flex justify-end">
                <div className="w-6 h-6 flex items-center justify-center ">
                  <Image src="/home/magazineArrow.png" alt="arrow" width={24} height={24} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Magazine;
