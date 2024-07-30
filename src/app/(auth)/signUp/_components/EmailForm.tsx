"use client";

import { createClient } from "@/utils/supabase/client";
import { MouseEventHandler, useState } from "react";

function EmailForm({ email, setEmail }: { email: string; setEmail: (email: string) => void }) {
  const [isDuplicated, setIsDuplicated] = useState<boolean>(false);
  const [isCorrected, setIsCorrected] = useState<boolean>(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  const supabase = createClient();

  const handleCheckDuplicate: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setIsInvalidEmail(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsInvalidEmail(true);
      setIsCorrected(false);
      setIsDuplicated(false);
      return;
    }
    let { data: users, error } = await supabase.from("users").select("*").eq("email", email);
    if (users!.length > 0) {
      //users의 타입정의 필요
      setIsDuplicated(true);
      setIsCorrected(false);
    } else {
      setIsDuplicated(false);
      setIsCorrected(true);
    }
  };

  return (
    <div className="AuthInputDiv">
      <label>이메일</label>
      <form className="AuthInputForm">
        <input
          type="email"
          value={email}
          placeholder="이메일을 입력해주세요"
          className={`AuthInputShort rounded-lg ${isDuplicated || isInvalidEmail ? "border-info-red" : isCorrected ? "border-info-green" : ""}`}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsDuplicated(false);
            setIsCorrected(false);
            setIsInvalidEmail(false);
          }}
        />
        <button className="AuthDupButton" onClick={handleCheckDuplicate}>
          중복체크
        </button>
      </form>
      {isDuplicated && <p className="AuthStateInfo text-info-red">동일한 이메일이 있습니다.</p>}
      {isCorrected && <p className="AuthStateInfoGreen text-info-green ">사용 가능한 이메일입니다.</p>}
      {isInvalidEmail && <p className="AuthStateInfo text-info-red">유효한 이메일 형식이 아닙니다.</p>}
    </div>
  );
}

export default EmailForm;
