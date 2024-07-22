import { TVote } from "@/types/vote.type";
import Link from "next/link";

type voteItemProps = {
  vote: TVote;
};

function VoteItem({ vote }: voteItemProps) {
  return (
    <li>
      <Link href="">
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <h2>{vote.title}</h2>
          <p>닉네임</p>
          <div>
            <span>투표수</span>
            <span>댓글수</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default VoteItem;
