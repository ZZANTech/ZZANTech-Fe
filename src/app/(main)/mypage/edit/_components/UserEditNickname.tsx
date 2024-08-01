"use client";

import { updateNickname } from "@/apis/auth";
import { useUserContext } from "@/provider/contexts/UserContext";
import { checkNicknameValidity } from "@/utils/authValidity";
import { useState } from "react";

function UserEditNickname() {
  const { user } = useUserContext();
  const oldNickname = user?.nickname || "";
  const userId = user?.userId || "";

  const [nickname, setNickname] = useState<string>(oldNickname);
  const [nicknameError, setNicknameError] = useState<string>("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);

  const handleNicknameChange = async () => {
    // 유효성 검사
    checkNicknameValidity({ nickname, setNicknameError });

    //중복확인 및 update API
    if (!nicknameError) {
      await updateNickname(nickname, userId, setNicknameError, setIsNicknameValid);

      if (!nicknameError && isNicknameValid) {
        alert("닉네임 변경 성공");
      }
    }
  };

  return (
    <div className="AuthInputDiv">
      <label>닉네임 변경</label>
      <input
        type="text"
        maxLength={20}
        value={nickname}
        placeholder="변경할 닉네임을 입력해주세요"
        className="AuthInputShort"
        onChange={(e) => setNickname(e.target.value)}
      />
      <button className="AuthDupButton" onClick={handleNicknameChange}>
        닉네임 변경하기
      </button>
      {nicknameError && <p className="AuthStateInfo">{nicknameError}</p>}
    </div>
  );
}

export default UserEditNickname;
