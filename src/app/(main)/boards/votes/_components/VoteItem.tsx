import { TVote } from "@/types/vote.type";
import Link from "next/link";

type voteItemProps = {
  vote: TVote;
};

function VoteItem({ vote }: voteItemProps) {
  const { image_url, title, nickname, votes_count, comments_count } = vote;

  return (
    <li>
      <Link href="">
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <h2>{title}</h2>
          <p>{nickname}</p>
          <div>
            <span>투표수: {votes_count}</span>
            <span>댓글수: {comments_count}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default VoteItem;
