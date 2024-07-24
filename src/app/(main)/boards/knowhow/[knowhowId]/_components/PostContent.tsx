"use client";
import { TKnowhow } from "@/types/knowhow.type";
import { formatTime } from "@/app/(main)/boards/_utils";

type PostContentProps = {
  knowhow: TKnowhow;
};

function PostContent({ knowhow }: PostContentProps) {
  const { formattedDate, formattedTime } = formatTime(knowhow?.created_at);
  console.log(knowhow);
  if (knowhow)
    return (
      <section>
        <div>제목 {knowhow.title}</div>
        <div>닉네임 {knowhow.nickname}</div>
        <div>날짜 {formattedDate}</div>
        <div>시간 {formattedTime}</div>
        <div dangerouslySetInnerHTML={{ __html: knowhow.content }} />
      </section>
    );
}

export default PostContent;
