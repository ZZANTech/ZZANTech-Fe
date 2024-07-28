import { TKnowhow } from "@/types/knowhow.type";
import { formatTime } from "@/app/(main)/boards/_utils";
import "react-quill/dist/quill.snow.css";

type PostContentProps = {
  knowhow: TKnowhow;
};

function PostContent({ knowhow }: PostContentProps) {
  const { formattedDate, formattedTime } = formatTime(knowhow?.created_at);
  console.log(knowhow.content);

  if (knowhow)
    return (
      <section className="px-[70px] py-11 border border-[#000] rounded-xl mb-[38px]">
        <div>제목 {knowhow.title}</div>
        <div>닉네임 {knowhow.nickname}</div>
        <div>날짜 {formattedDate}</div>
        <div>시간 {formattedTime}</div>
        <div className="knowhow-content" dangerouslySetInnerHTML={{ __html: knowhow.content }} />
      </section>
    );
}

export default PostContent;
