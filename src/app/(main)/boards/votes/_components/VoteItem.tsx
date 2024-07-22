import Link from "next/link";

function VoteItem() {
  return (
    <li>
      <Link href="">
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <h2>제목</h2>
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
