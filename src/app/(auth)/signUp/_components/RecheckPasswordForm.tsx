"use client";

import { useState } from "react";

function RecheckPasswordForm({
  confirmPassword,
  setConfirmPassword,
  password,
  setConfirmPasswordValid
}: {
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  password: string;
  setConfirmPasswordValid: (confirmPasswordValid: boolean | null) => void;
}) {
  const [isCorrected, setIsCorrected] = useState<boolean | null>(null);

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);

    if (confirmPassword !== password) {
      setConfirmPasswordValid(false);
      setIsCorrected(false);
    } else {
      console.log("isCorrected", isCorrected);
      setConfirmPasswordValid(true);
      setIsCorrected(true);
    }
  };

  return (
    <div className="flex flex-col">
      <label>비밀번호 확인</label>
      <input
        type="password"
        value={confirmPassword}
        maxLength={20}
        placeholder="최소 6~20자, 특수문자 가능"
        className={`auth-input ${confirmPassword === "" || confirmPassword !== password ? "border-info-red" : isCorrected ? "border-info-green" : ""}`}
        onChange={handleConfirmPasswordChange}
      />
      <p className="text-info-red text-xs">{confirmPassword !== password ? "비밀번호가 틀립니다" : ""}</p>
      <p className="text-info-green text-xs">
        {confirmPassword !== password ? "" : isCorrected ? "비밀번호와 일치합니다" : ""}
      </p>
    </div>
  );
}

export default RecheckPasswordForm;
