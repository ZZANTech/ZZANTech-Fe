"use client";
import { TKnowhow } from "@/types/knowhow.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";
import Link from "next/link";
import Image from "next/image";
import CommentCount from "@/app/(main)/boards/knowhow/_components/knowhowItem/CommentCount";
import LikeCount from "@/app/(main)/boards/knowhow/_components/knowhowItem/LikeCount";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import clsx from "clsx";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

type KnowhowItemProps = {
  knowhow: TKnowhow;
  isDetailPage?: boolean;
};

function removeHTMLTags(content: string) {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(content, "text/html");
  return parsedDocument.body.textContent || "";
}

function KnowhowItem({ knowhow }: KnowhowItemProps) {
  const { isWideScreen } = useIsWideScreen();
  const { title, content, nickname, created_at, comments_count, likes_count, image_urls, knowhow_postId } = knowhow;
  const formattedCreatedAt = dayjs(created_at).tz("Asia/Seoul").fromNow();
  const textOnlyContent = removeHTMLTags(content);

  return (
    <li
      className="
     w-full h-[140px] py-5 pb-4 border-b border-gray-900
     md:h-[240px] md:py-8
     "
    >
      <Link className="flex h-full " href={`/boards/knowhow/${knowhow.knowhow_postId}`}>
        <div className="w-full flex justify-between gap-4 relative px-0">
          <div
            className="
          flex w-full max-w-[63%] flex-col 
          md:max-w-[74.5%]
          "
          >
            <div
              className="
            flex gap-[13px] items-center mb-1.5 
            md:mb-4
            "
            >
              <div className="flex gap-2">
                <div className="w-6 h-6 flex justify-center items-center relative aspect-square">
                  <Image className="rounded-full object-cover" src={knowhow.badge_url || ""} alt="profile" fill />
                </div>
                <span
                  className="
                text-gray-500 font-semibold text-sm
                md:text-gray-800 md:text-base
                "
                >
                  {nickname}
                </span>
              </div>
              <time className="text-sm text-gray-300">{formattedCreatedAt}</time>
            </div>

            <h2
              className={clsx(
                "font-semibold text-gray-900 mb-5 ",
                !isWideScreen && "h-12 line-clamp-2 break-words mb-2.5 ",
                isWideScreen && "text-xl truncate "
              )}
            >
              {title}
            </h2>

            {isWideScreen && (
              <div className="w-full">
                <p className="text-base text-[#5A5A5A] line-clamp-2 break-words">{textOnlyContent}</p>
              </div>
            )}

            <div className="flex gap-4 absolute bottom-0">
              <CommentCount commentCount={comments_count} />
              <LikeCount knowhowId={knowhow_postId} likesCount={likes_count} />
            </div>
          </div>
          {image_urls?.length > 0 && (
            <div className="h-full flex items-center">
              <div
                className="
                relative
              w-[100px] h-[100px]
              md:w-[128px] md:h-[128px]
              "
              >
                <Image
                  className="object-contain rounded-lg"
                  priority
                  loading="eager"
                  src={image_urls[0]}
                  alt={title}
                  fill
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}

export default KnowhowItem;
