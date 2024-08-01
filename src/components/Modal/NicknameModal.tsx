"use client";

import { updateNickname } from "@/apis/auth";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import { checkNicknameValidity } from "@/utils/authValidity";
import { useState } from "react";

function NicknameModal() {
  const { user } = useUserContext();
  const email = user?.email;
  const oldNickname = user?.nickname;

  const [nickname, setNickname] = useState<string>(oldNickname || "");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);
  const { close } = useModal(); // 모달 닫을땐 여기서 close 꺼내쓰시면 됩니다.

  const handleChangeNickname = async () => {
    // 유효성 검사: 빈칸, 글자 수, 특수문자
    setNicknameError("");
    checkNicknameValidity({ nickname, setNicknameError });

    // 중복확인 및 update API
    if (!nicknameError) {
      await updateNickname(nickname, email || "", setNicknameError, setIsNicknameValid);
    }

    if (!isNicknameValid) {
      console.log("handleChangeNickname 변경 안 됐어>>", nickname);
    } else {
      console.log("handleChangeNickname 변경 됐다>>", nickname);
    }
  };

  return (
    <div>
      <h2>닉네임 변경</h2>
      <input
        type="text"
        maxLength={20}
        value={nickname}
        placeholder="변경할 닉네임을 입력해주세요"
        onChange={(e) => setNickname(e.target.value)}
      />
      {nicknameError && <p className="AuthStateInfo">{nicknameError}</p>}
      <button onClick={handleChangeNickname}>화이팅!</button>
    </div>
  );
}

export default NicknameModal;
