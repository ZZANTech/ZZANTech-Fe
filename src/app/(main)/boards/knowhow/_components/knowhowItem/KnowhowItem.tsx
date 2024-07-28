import { TKnowhow } from "@/types/knowhow.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Link from "next/link";
import Image from "next/image";
import useKnowhowLikesCountQuery from "@/stores/queries/useKnowhowLikesCountQuery";
import CommentCount from "@/app/(main)/boards/knowhow/_components/knowhowItem/CommentCount";
import LikeCount from "@/app/(main)/boards/knowhow/_components/knowhowItem/LikeCount";

type KnowhowItemProps = {
  knowhow: TKnowhow;
};

dayjs.extend(relativeTime);
dayjs.locale("ko");

function KnowhowItem({ knowhow }: KnowhowItemProps) {
  const { title, content, nickname, created_at, comments_count, likes_count, image_urls, knowhow_postId } = knowhow;
  const formattedCreatedAt = dayjs(created_at).fromNow();
  const textOnlyContent = content.replace(/<[^>]+>/g, "");

  return (
    <li className="w-full h-[220px] border   border-[#111] rounded-xl px-10 py-5">
      <Link className="flex h-full " href={`/boards/knowhow/${knowhow.knowhow_postId}`}>
        <div className="w-full   flex gap-9 relative">
          <div className="flex w-full   flex-col overflow-hidden">
            <div className="flex gap-3 items-center mb-3.5">
              <div className="flex gap-2">
                <Image src={knowhow.badge_url || ""} alt="badge" width={24} height={24} />
                <span className="font-semibold">{nickname}</span>
              </div>
              <time className="text-sm text-[#ADADAD]">{formattedCreatedAt}</time>
            </div>
            <h4 className="text-xl font-semibold text-[#000] mb-3.5 truncate">{title}</h4>
            <div className="">
              <p className=" text-base text-[#5A5A5A] line-clamp-2 ">{textOnlyContent}</p>
            </div>
            <div className="flex gap-4 absolute bottom-0">
              <CommentCount commentCount={comments_count} />
              <LikeCount knowhowId={knowhow_postId} likesCount={likes_count} />
            </div>
          </div>
          {image_urls?.length > 0 && <Image src={image_urls[0]} alt={title} width={220} height={170} />}
        </div>
      </Link>
    </li>
  );
}

export default KnowhowItem;
