import { TKnowhow } from "@/types/knowhow.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Link from "next/link";
import Image from "next/image";
import useKnowhowLikesCountQuery from "@/stores/queries/useKnowhowLikesCountQuery";
import CommentCount from "@/app/(main)/boards/knowhow/_components/knowhowItem/CommentCount";
import LikeCount from "@/app/(main)/boards/knowhow/_components/knowhowItem/LikeCount";

type knowhowItemProps = {
  knowhow: TKnowhow;
};

dayjs.extend(relativeTime);
dayjs.locale("ko");

function KnowhowItem({ knowhow }: knowhowItemProps) {
  const { title, content, nickname, created_at, comments_count, likes_count, image_urls, knowhow_postId } = knowhow;
  const formattedCreatedAt = dayjs(created_at).fromNow();
  const textWithoutImages = content.replace(/<img[^>]*>/g, "");

  return (
    <li className="w-full h-[220px] border border-[#111] rounded-xl px-10 py-5">
      <Link className="flex" href={`/boards/knowhow/${knowhow.knowhow_postId}`}>
        <div className="w-full bg-white">
          <div className="flex gap-3">
            <span>{nickname}</span>
            <time>{formattedCreatedAt}</time>
          </div>
          <h4>{title}</h4>
          <p dangerouslySetInnerHTML={{ __html: textWithoutImages }} />
          <div className="flex gap-6">
            <CommentCount commentCount={comments_count} />
            <LikeCount knowhowId={knowhow_postId} likesCount={likes_count} />
          </div>
        </div>
        {image_urls?.length > 0 && <Image src={image_urls[0]} alt={title} width={220} height={170} />}
      </Link>
    </li>
  );
}

export default KnowhowItem;
