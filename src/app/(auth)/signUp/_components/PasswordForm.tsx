"use client";

import { useState } from "react";

function PasswordForm({ password, setPassword }: { password: string; setPassword: (password: string) => void }) {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const regex = /^[a-zA-Z\d!@#$%^&*()_+~`|}{[\]:;?><,./-=]{6,30}$/;
    const isValid = regex.test(newPassword);
    setIsPasswordValid(isValid);
    setIsPasswordInvalid(!isValid);
  };

  return (
    <div className="AuthInputDiv">
      <label>비밀번호</label>
      <input
        type="password"
        value={password}
        maxLength={40}
        placeholder="비밀번호를 입력해주세요"
        className={`AuthInput ${isPasswordInvalid ? "border-info-red" : isPasswordValid ? "border-info-green" : ""}`}
        onChange={handlePasswordChange}
      />
      {isPasswordInvalid && <p className="AuthStateInfo">비밀번호는 6자리 이상 30자리 이하로 설정해 주세요.</p>}
      {isPasswordValid && <p className="AuthStateInfoGreen">가능한 비밀번호 입니다</p>}
    </div>
  );
}

export default PasswordForm;
