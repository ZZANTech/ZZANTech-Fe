"use client";

import { useEffect, useState } from "react";

function UserEditPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordValidState, setIsPasswordValidState] = useState<boolean>(false);

  const oldPassword = "123123";

  const CheckPasswordValidity = () => {
    if (newPassword.length < 3 || newPassword.length > 12) {
      setPasswordError("비밀번호는 3자 이상 12자 이하이어야 합니다.");
      setIsPasswordValidState(false);
      return;
    }
    if (/[^a-zA-Z0-9]/.test(newPassword)) {
      setPasswordError("비밀번호에 특수문자는 포함될 수 없습니다.");
      setIsPasswordValidState(false);
      return;
    }
    if (newPassword === oldPassword) {
      setPasswordError("기존 비밀번호와 달라야 합니다.");
      setIsPasswordValidState(false);
      return;
    }
    setPasswordError("");
    setIsPasswordValidState(true);
  };

  useEffect(() => {
    CheckPasswordValidity();
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
