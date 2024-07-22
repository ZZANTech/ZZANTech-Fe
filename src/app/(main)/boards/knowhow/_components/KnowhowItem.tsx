import { TKnowhow } from "@/types/knowhow.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Link from "next/link";

type knowhowItemProps = {
  knowhow: TKnowhow;
};

dayjs.extend(relativeTime);
dayjs.locale("ko");

function KnowhowItem({ knowhow }: knowhowItemProps) {
  const { title, content, nickname, created_at, comments_count, likes_count } = knowhow;
  const formattedCreatedAt = dayjs(created_at).fromNow();
  return (
    <li className="w-[1080px] h-[220px] border rounded-xl">
      <Link href={`/boards/knowhow/${knowhow.knowhow_postId}`}>
        <div>제목: {title}</div>
        <div>내용: {content}</div>
        <div>작성자 닉네임: {nickname}</div>
        <div>{formattedCreatedAt}</div>
        <div>댓글 수 {comments_count}</div>
        <div>좋아요 수 {likes_count}</div>
      </Link>
    </li>
  );
}

export default KnowhowItem;
