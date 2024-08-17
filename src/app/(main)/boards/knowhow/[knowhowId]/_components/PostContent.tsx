import { TKnowhow } from "@/types/knowhow.type";
import { formatTime } from "@/app/(main)/boards/_utils";
import "react-quill/dist/quill.snow.css";
import clockIcon from "/public/icons/clock.svg";
import Image from "next/image";
import parse, { domToReact, Element } from "html-react-parser";

type PostContentProps = {
  knowhow: TKnowhow;
};

function PostContent({ knowhow }: PostContentProps) {
  if (!knowhow) return null;

  const { formattedDate, formattedTime } = formatTime(knowhow.created_at);

  let isFirstImage = true;
  const transformContent = (htmlContent: string) => {
    return parse(htmlContent, {
      replace: (domNode) => {
        if (domNode instanceof Element) {
          if (domNode.name === "p") {
            return (
              <p>
                {domToReact(domNode.children as unknown as Element[], {
                  replace: (childNode) => {
                    if (childNode instanceof Element && childNode.name === "img") {
                      const { src, alt, width, height } = childNode.attribs;
                      const imgWidth = width ? parseInt(width) : 600;
                      const imgHeight = height ? parseInt(height) : 400;
                      if (src) {
                        const imageElement = (
                          <Image
                            src={src}
                            alt={alt || "image"}
                            priority={isFirstImage}
                            loading={isFirstImage ? "eager" : "lazy"}
                            width={imgWidth}
                            height={imgHeight}
                          />
                        );
                        isFirstImage = false;
                        return imageElement;
                      }
                    }
                    return childNode;
                  }
                })}
              </p>
            );
          }
          return domNode;
        }
        return domNode;
      }
    });
  };

  const transformedContent = transformContent(knowhow.content);

  return (
    <section className="py-9 w-full min-h-[400px] md:min-h-[700px] mb-[38px] border-b border-[#000]">
      <h1
        className="
      mb-2 text-2xl break-words leading-[34px] font-semibold text-gray-900
      md:text-[32px] md:mb-3
      "
      >
        {knowhow.title}
      </h1>

      <div className="flex gap-5 items-center mb-10">
        <div className="flex gap-2">
          {knowhow.badge_url && <Image src={knowhow.badge_url} alt="badge" width={24} height={24} />}
          <span className="font-semibold text-gray-700">{knowhow.nickname}</span>
        </div>
        <time className="flex text-sm leading-3 items-center text-[#5A5A5A]">
          <Image src={clockIcon} alt="clock" width={16} height={16} />
          <span className="ml-1">{formattedDate}</span>
          <span className="ml-2">{formattedTime}</span>
        </time>
      </div>

      <article
        className="
      knowhow-content text-gray-900 md:text-[#5A5A5A] break-words mt-9 
      md:mt-12
      "
      >
        {transformedContent}
      </article>
    </section>
  );
}

export default PostContent;
