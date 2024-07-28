"use client";

import { CheckPasswordValidity } from "@/app/(main)/mypage/edit/_components/checkPasswordValidity";
import { useEffect, useState } from "react";

function UserEditPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordValidState, setIsPasswordValidState] = useState<boolean>(false);

  const oldPassword = "123123";

  useEffect(() => {
    CheckPasswordValidity({ oldPassword, newPassword, setPasswordError, setIsPasswordValidState });
  }, [newPassword]);

  return (
    <>
      <p>기본 비밀번호</p>

      <label>새 비밀번호</label>
      <input
        type="password"
        value={newPassword}
        placeholder="새로운 비밀번호를 입력해주세요"
        className="AuthInput"
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      {isPasswordValidState ? "" : <p className="AuthStateInfo">{passwordError}</p>}

      <p>새 비밀번호 확인</p>
    </>
  );
}

export default UserEditPassword;
