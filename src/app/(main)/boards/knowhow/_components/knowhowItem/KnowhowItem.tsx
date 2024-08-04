import { TKnowhow } from "@/types/knowhow.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import Link from "next/link";
import Image from "next/image";
import useKnowhowLikesCountQuery from "@/stores/queries/knowhow/like/useKnowhowLikesCountQuery";
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
    <li className="w-full h-[240px] border-b border-b-basic py-8">
      <Link className="flex h-full " href={`/boards/knowhow/${knowhow.knowhow_postId}`}>
        <div className="w-full flex gap-9 relative px-0">
          <div className="flex w-full max-w-[805px] flex-col overflow-hidden">
            <div className="flex gap-3 items-center mb-4">
              <div className="flex gap-2">
                <div className="w-6 h-6 flex justify-center items-center relative aspect-square">
                  <Image className="rounded-full object-cover" src={knowhow.badge_url || ""} alt="profile" fill />
                </div>
                <span className="font-semibold">{nickname}</span>
              </div>
              <time className="text-sm text-[#ADADAD]">{formattedCreatedAt}</time>
            </div>
            <h2 className="text-xl font-semibold text-[#000] mb-5 truncate">{title}</h2>

            <div className="max-w-[805px] ">
              <p className=" text-base text-[#5A5A5A] line-clamp-2 ">{textOnlyContent}</p>
            </div>

            <div className="flex gap-4 absolute bottom-0">
              <CommentCount commentCount={comments_count} />
              <LikeCount knowhowId={knowhow_postId} likesCount={likes_count} />
            </div>
          </div>
          {image_urls?.length > 0 && (
            <div className="absolute top-1/2 transform -translate-y-1/2 right-0 w-[128px] h-[128px]">
              <Image className="object-cover  rounded-lg" src={image_urls[0]} alt={title} fill />
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}

export default KnowhowItem;
