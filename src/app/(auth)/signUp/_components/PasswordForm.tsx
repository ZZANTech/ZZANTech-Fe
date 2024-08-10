"use client";

import { checkPasswordValidity } from "@/utils/authValidity";
import { useState } from "react";

function PasswordForm({
  password,
  setPassword,
  setPasswordValid
}: {
  password: string;
  setPassword: (password: string) => void;
  setPasswordValid: (passwordValid: boolean | null) => void;
}) {
  const [isCorrected, setIsCorrected] = useState<boolean | null>(null);
  const [passwordError, setPasswordError] = useState<string>("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    //초기화
    setIsCorrected(null);
    setPasswordError("");
    setPasswordValid(null);

    // 유효성검사: 글자 수, 특수문자 조합 등
    checkPasswordValidity({ password, setPasswordError });

    if (!passwordError) {
      setPasswordValid(true);
      setIsCorrected(true);
    } else {
      setPasswordValid(false);
      setIsCorrected(false);
    }
  };

  return (
    <div className="flex flex-col">
      <label>비밀번호</label>
      <input
        type="password"
        value={password}
        maxLength={20}
        placeholder="최소 6~20자, 영어+특수문자 조합"
        className={`auth-input ${passwordError ? "border-info-red" : isCorrected ? "border-info-green" : ""}`}
        onChange={handlePasswordChange}
      />
      {passwordError && <p className="text-info-red text-xs">{passwordError}</p>}
    </div>
  );
}

export default PasswordForm;
