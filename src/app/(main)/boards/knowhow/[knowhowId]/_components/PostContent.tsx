import { TKnowhow } from "@/types/knowhow.type";
import { formatTime } from "@/app/(main)/boards/_utils";
import "react-quill/dist/quill.snow.css";
import clockIcon from "/public/icons/clock.svg";
import Image from "next/image";

type PostContentProps = {
  knowhow: TKnowhow;
};

function PostContent({ knowhow }: PostContentProps) {
  const { formattedDate, formattedTime } = formatTime(knowhow?.created_at);

  if (knowhow)
    return (
      <section className="px-[70px] py-11 border border-[#000] rounded-xl mb-[38px]">
        <h1 className="text-[32px] text-[#000] font-semibold ">{knowhow.title}</h1>
        <div className="flex gap-11">
          <span className="font-semibold text-[#2D2D2D]">{knowhow.nickname}</span>
          <time className="flex items-center text-[#5A5A5A] ">
            <Image src={clockIcon} alt="clock" />
            <span className="ml-1 ">{formattedDate}</span>
            <span className="ml-[7px]">{formattedTime}</span>
          </time>
        </div>
        <article
          className="text-[#5A5A5A] knowhow-content mt-12"
          dangerouslySetInnerHTML={{ __html: knowhow.content }}
        />
      </section>
    );
}

export default PostContent;
