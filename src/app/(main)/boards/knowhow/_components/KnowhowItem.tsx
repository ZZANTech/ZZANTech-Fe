import { TKnowhow } from "@/types/knowhow.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Link from "next/link";
import Image from "next/image";
import useKnowhowLikesCountQuery from "@/stores/queries/useKnowhowLikesCountQuery";

type knowhowItemProps = {
  knowhow: TKnowhow;
};

dayjs.extend(relativeTime);
dayjs.locale("ko");

function KnowhowItem({ knowhow }: knowhowItemProps) {
  const { data: likeCountData } = useKnowhowLikesCountQuery(knowhow.knowhow_postId);

  const { title, content, nickname, created_at, comments_count, likes_count, image_urls } = knowhow;
  const formattedCreatedAt = dayjs(created_at).fromNow();
  const textWithoutImages = content.replace(/<img[^>]*>/g, "");

  return (
    <li className="w-full h-[220px] border rounded-xl p-4">
      <Link className="flex" href={`/boards/knowhow/${knowhow.knowhow_postId}`}>
        <div className="w-full bg-white">
          <div>{title}</div>
          <div dangerouslySetInnerHTML={{ __html: textWithoutImages }} />
          <div> {nickname}</div>
          <div>{formattedCreatedAt}</div>
          <div>댓글 수 {comments_count}</div>
          <div className="flex items-center">
            <span>{likeCountData?.isLiked ? "🩷" : "🤍"}</span>
            <span>{likeCountData?.likeCount || likes_count}</span>
          </div>
        </div>
        {image_urls?.length > 0 && <Image src={image_urls[0]} alt={title} width={150} height={150} />}
      </Link>
    </li>
  );
}

export default KnowhowItem;
