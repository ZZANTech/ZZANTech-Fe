"use client";

import { useState } from "react";

function LoginEmailForm({ email, setEmail }: { email: string; setEmail: (email: string) => void }) {
  const [isCorrected, setCorrected] = useState(true);

  return (
    <div className="flex flex-col w-[440px] gap-2.5 p-2.5 bg-white">
      <label>이메일</label>
      <input
        type="email"
        value={email}
        placeholder="이메일을 입력해주세요"
        className="w-100% h-[56px] p-[16px] border"
        onChange={(e) => {
          setEmail(e.target.value);
          const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
          const emailTest = email_regex.exec(email);
          if (!emailTest) {
            setCorrected(false);
          } else {
            setCorrected(true);
          }
        }}
      />
      {isCorrected ? "" : <p className="text-red-500 text-xs">아이디가 옳지 않습니다.</p>}
    </div>
  );
}

export default LoginEmailForm;
