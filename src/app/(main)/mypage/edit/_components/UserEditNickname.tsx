"use client";

import { updateNickname } from "@/apis/auth";
import { CheckNicknameValidity } from "@/app/(main)/mypage/edit/_components/checkValidity";
import { useUserContext } from "@/provider/contexts/UserContext";
import { MouseEvent, useState } from "react";

function UserEditNickname() {
  const [nickname, setNickname] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);
  // 유효성 검사 통과할 경우: isNicknameValid === true
  // 유효성 검사 통과 못 할 경우: isNicknameValid === false
  const [nicknameDupError, setNicknameDupError] = useState<string>("");
  const [isNicknameAllPassed, setIsNicknameAllPassed] = useState<boolean>(false);
  // 중복확인 통과할 경우: isNicknameAllPassed === true
  // 중복확인 통과 못 할 경우: isNicknameAllPassed === false

  const { user } = useUserContext();
  const userId: string | undefined = user?.userId;

  const handleNicknameChange = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 유효성 검사
    // CheckNicknameValidity({ nickname, setNicknameError, setIsNicknameValid });

    // 유효성 검사 통화 못 할 경우 중복확인 실시 안 함
    if (!isNicknameValid) {
      setNicknameDupError("");
      setIsNicknameAllPassed(false);
    }

    // 3. 중복확인
    if (isNicknameValid) {
      await updateNickname(nickname, userId || "", setNicknameDupError, setIsNicknameAllPassed);
    }
  };

  return (
    <div className="AuthInputDiv">
      <label>닉네임 변경</label>
      <input
        type="text"
        value={nickname}
        placeholder="변경할 닉네임을 입력해주세요"
        className="AuthInputShort"
        onChange={(e) => {
          setNickname(e.target.value);
          CheckNicknameValidity({ nickname: e.target.value, setNicknameError, setIsNicknameValid });
          if (isNicknameAllPassed) {
            setNicknameDupError("");
            setIsNicknameAllPassed(false);
          }
        }}
      />

      <button className="AuthDupButton" onClick={handleNicknameChange}>
        닉네임 변경하기
      </button>
      {isNicknameValid ? "" : <p className="AuthStateInfo">{nicknameError}</p>}
      {isNicknameAllPassed ? (
        <p className="AuthStateInfoGreen">{nicknameDupError}</p>
      ) : (
        <p className="AuthStateInfo">{nicknameDupError}</p>
      )}
    </div>
  );
}

export default UserEditNickname;
