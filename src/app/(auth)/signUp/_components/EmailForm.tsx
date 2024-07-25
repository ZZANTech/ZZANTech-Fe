"use client";

import { createClient } from "@/utils/supabase/client";
import { ChangeEvent, MouseEventHandler, useState } from "react";

function EmailForm({ email, setEmail }: { email: string; setEmail: (email: string) => void }) {
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [isCorrected, setIsCorrected] = useState(false);
  const supabase = createClient();

  const handleCheckDuplicate: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
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
          className="AuthInputShort"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button className="AuthDupButton" onClick={handleCheckDuplicate}>
          중복체크
        </button>
      </form>
      {isDuplicated ? <p className="AuthStateInfo">동일한 이메일이 있습니다.</p> : ""}
      {isCorrected ? <p className="AuthStateInfoGreen">사용 가능한 이메일입니다.</p> : ""}
    </div>
  );
}

export default EmailForm;
