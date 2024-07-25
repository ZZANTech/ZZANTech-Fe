"use client";

import { useState } from "react";

function LoginPasswordForm({ password, setPassword }: { password: string; setPassword: (password: string) => void }) {
  const [isCorrected, setCorrected] = useState(true);

  return (
    <div className="flex flex-col w-[440px] gap-2.5 p-2.5 bg-white">
      <label>비밀번호</label>
      <input
        type="password"
        value={password}
        placeholder="비밀번호를 입력해주세요"
        className="w-100% h-[56px] p-[16px] border"
        onChange={(e) => {
          setPassword(e.target.value);
          const regex = /^[a-z\d]{4,12}$/;
          const passwordTest = regex.exec(password);
          if (!passwordTest) {
            setCorrected(false);
          } else {
            setCorrected(true);
          }
        }}
      />
      {isCorrected ? "" : <p className="text-red-500 text-xs">비밀번호가 옳지 않습니다.</p>}
    </div>
  );
}

export default LoginPasswordForm;
