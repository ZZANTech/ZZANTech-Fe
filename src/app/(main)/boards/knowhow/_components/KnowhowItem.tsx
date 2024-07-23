import { TKnowhow } from "@/types/knowhow.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Link from "next/link";
import Image from "next/image";

type knowhowItemProps = {
  knowhow: TKnowhow;
};

dayjs.extend(relativeTime);
dayjs.locale("ko");

function KnowhowItem({ knowhow }: knowhowItemProps) {
  const { title, content, nickname, created_at, comments_count, likes_count, image_urls } = knowhow;
  const formattedCreatedAt = dayjs(created_at).fromNow();
  const textWithoutImages = content.replace(/<img[^>]*>/g, "");
  return (
    <li className="w-[1080px] h-[220px] border rounded-xl">
      <Link className="flex" href={`/boards/knowhow/${knowhow.knowhow_postId}`}>
        <div>
          <div>{title}</div>
          <div dangerouslySetInnerHTML={{ __html: textWithoutImages }} />
          <div> {nickname}</div>
          <div>{formattedCreatedAt}</div>
          <div>댓글 수 {comments_count}</div>
          <div>좋아요 수 {likes_count}</div>
        </div>
        {image_urls?.length > 0 && <Image src={image_urls[0]} alt={title} width={300} height={300} />}
      </Link>
    </li>
  );
}

export default KnowhowItem;
