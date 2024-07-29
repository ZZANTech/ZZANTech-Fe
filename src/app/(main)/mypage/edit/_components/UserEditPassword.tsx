"use client";

import { CheckPasswordValidity } from "@/app/(main)/mypage/edit/_components/checkValidity";
import { useEffect, useState } from "react";

function UserEditPassword() {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [recheckPassword, setRecheckPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordValidState, setIsPasswordValidState] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-5">
      <label>기존 비밀번호</label>
      <input
        type="password"
        value={oldPassword}
        placeholder="기존 비밀번호를 입력해주세요"
        className="AuthInput"
        onChange={(e) => {
          setOldPassword(e.target.value);
        }}
      />

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

      <label>새 비밀번호 확인</label>
      <input
        type="password"
        value={recheckPassword}
        placeholder="새로운 비밀번호를 다시 입력해주세요"
        className="AuthInput"
        onChange={(e) => {
          setRecheckPassword(e.target.value);
        }}
      />
      {isPasswordValidState ? "" : <p className="AuthStateInfo">{passwordError}</p>}

      <button
        onClick={() => CheckPasswordValidity({ oldPassword, newPassword, setPasswordError, setIsPasswordValidState })}
      >
        비밀번호 변경
      </button>
    </div>
  );
}

export default UserEditPassword;
