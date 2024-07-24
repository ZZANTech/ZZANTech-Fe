"use client";

import NavButton from "./NavButton";
import VoteButtons from "./VoteButtons";

function VoteContent() {
  return (
    <section>
      <NavButton direction="prev" />
      <div>타이틀</div>
      {/* 아래 div 디자인 확정되면 수정할 것 */}
      <div>
        <div>
          <span>상품명</span>
          <span>상품 가격</span>
        </div>
        <div>닉네임</div>
      </div>
      <div>
        <img src="" alt="" />
      </div>
      <VoteButtons />
      <div>내용</div>
      <NavButton direction="next" />
    </section>
  );
}

export default VoteContent;
