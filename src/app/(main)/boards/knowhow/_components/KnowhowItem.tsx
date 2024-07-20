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
  const formattedCreatedAt = dayjs(knowhow.created_at).fromNow();
  return (
    <li className="w-[1080px] h-[220px] border rounded-xl">
      <Link href={`/boards/knowhow/${knowhow.tip_post_id}`}>
        <div>제목: {knowhow.title}</div>
        <div>내용: {knowhow.content}</div>
        <div>작성자 닉네임: {knowhow.nickname}</div>
        <div>{formattedCreatedAt}</div>
        <div>댓글 수 {knowhow.commentsCount}</div>
        <div>좋아요 수 {knowhow.likes_count}</div>
      </Link>
    </li>
  );
}

export default KnowhowItem;
