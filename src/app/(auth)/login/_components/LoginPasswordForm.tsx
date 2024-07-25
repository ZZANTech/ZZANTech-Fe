"use client";

import { useState } from "react";

function LoginPasswordForm({ password, setPassword }: { password: string; setPassword: (password: string) => void }) {
  const [isCorrected, setCorrected] = useState(true);

  return (
    <div className="AuthInputDiv">
      <label>비밀번호</label>
      <input
        type="password"
        value={password}
        placeholder="비밀번호를 입력해주세요"
        className="AuthInput"
        onChange={(e) => {
          setPassword(e.target.value);
          // 유효성 검사: 비밀번호
          const regex = /^[a-z\d]{4,12}$/;
          const passwordTest = regex.exec(password);
          if (!passwordTest) {
            setCorrected(false);
          } else {
            setCorrected(true);
          }
        }}
      />
      {isCorrected ? "" : <p className="AuthStateInfo">비밀번호가 옳지 않습니다.</p>}
    </div>
  );
}

export default LoginPasswordForm;
