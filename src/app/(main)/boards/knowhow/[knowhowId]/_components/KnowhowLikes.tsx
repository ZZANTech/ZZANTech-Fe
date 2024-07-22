"use client";
type knowhowLikesProps = {
  knowhowId: number;
};

function KnowhowLikes({ knowhowId }: knowhowLikesProps) {
  // TODO 좋아요 개수, 현재 유저가 해당 게시물에 좋아요를 눌렀는지 여부 가져오기
  return (
    <div className="flex gap-1">
      <div>🩷</div>
      <div>좋아요</div>
      <div>좋아요개수</div>
    </div>
  );
}

export default KnowhowLikes;
