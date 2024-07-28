import { TKnowhow, TKnowhowComment } from "@/types/knowhow.type";
import commentIcon from "/public/icons/comment.svg";
import Image from "next/image";

function CommentCount({ commentCount }: { commentCount: TKnowhow["comments_count"] }) {
  return (
    <div className="flex">
      <Image src={commentIcon} alt="comment" />
      <span>댓글 수 {commentCount}</span>
    </div>
  );
}

export default CommentCount;
