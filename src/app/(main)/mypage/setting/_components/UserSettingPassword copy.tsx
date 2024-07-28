"use client";

import { useEffect, useState } from "react";

function UserSettingPassword22() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordValidState, setIsPasswordValidState] = useState<boolean>(false);

  const oldPassword = "123123";

  useEffect(() => {
    // CheckPasswordValidity();
  }, [newPassword]);

  return (
    <>
      <label>새 비밀번호22</label>
      <input
        type="password"
        value={newPassword}
        placeholder="새로운 비밀번호를 입력해주세요"
        className="AuthInput"
        onChange={(e) => {
          setNewPassword(e.target.value);
          // checkPassword(e);
        }}
      />
      {isPasswordValidState ? (
        <p className="AuthStateInfoGreen">사용 가능한 비밀번호입니다.</p>
      ) : (
        <p className="AuthStateInfo">{passwordError}</p>
      )}
    </>
  );
}

export default UserSettingPassword22;
