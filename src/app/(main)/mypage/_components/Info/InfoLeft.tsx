"use Client";

import { useUserContext } from "@/provider/contexts/UserContext";

function InfoLeft() {
  // const { user } = useUserContext();

  return (
    <div>
      <div className="flex flex-row gap-2.5">
        <p>뱃지</p>
        <p>user?.nickname 님</p>
      </div>

      <div className="flex flex-row gap-2.5">
        <p>이메일 주소</p>
        <p>user?.email</p>
      </div>
    </div>
  );
}

export default InfoLeft;
