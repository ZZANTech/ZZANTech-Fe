"use client";
import { TKnowhow } from "@/types/knowhow.type";
import dayjs from "dayjs";

type PostContentProps = {
  knowhow: TKnowhow;
};

function PostContent({ knowhow }: PostContentProps) {
  const date = dayjs(knowhow.created_at);
  const formattedDate = date.format("YYYY.MM.DD");
  const formattedTime = date.format("HH:mm");
  if (knowhow)
    return (
      <div>
        <div>제목 {knowhow.title}</div>
        <div>닉네임 {knowhow.nickname}</div>
        <div>날짜 {formattedDate}</div>
        <div>시간 {formattedTime}</div>
        <div>내용 {knowhow.content}</div>
      </div>
    );
}

export default PostContent;
