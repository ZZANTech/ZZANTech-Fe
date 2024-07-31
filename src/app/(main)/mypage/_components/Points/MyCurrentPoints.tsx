"use client";

import { useUserContext } from "@/provider/contexts/UserContext";

function MyCurrentPoints() {
  const { user } = useUserContext();

  return (
    <div>
      <div>{user?.nickname}님의 사용 가능 포인트 입니다.</div>
      <div>{user?.current_point}p</div>
    </div>
  );
}

export default MyCurrentPoints;
