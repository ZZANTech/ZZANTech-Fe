"use client";

import { createClient } from "@/utils/supabase/client";
import { MouseEventHandler, useState } from "react";

function EmailForm({
  email,
  setEmail,
  setEmailDup
}: {
  email: string;
  setEmail: (email: string) => void;
  setEmailDup: (emailDup: boolean | null) => void;
}) {
  const [isCorrected, setIsCorrected] = useState<boolean | null>(null);
  const [emailError, setEmailError] = useState<string>("");
  const supabase = createClient();

  const handleCheckDuplicate: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    //초기화
    setIsCorrected(null);
    setEmailError("");
    setEmailDup(null);

    //유효성 검사: 이메일 형식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("이메일 형식에 맞게 입력해주세요");
      return;
    }
    let { data: users, error } = await supabase.from("users").select("*").eq("email", email);

    if (users!.length > 0) {
      //users의 타입정의 필요
      setEmailError("이미 사용 중인 이메일입니다.");
      setEmailDup(false);
      return;
    } else {
      setIsCorrected(true);
      setEmailDup(true);
    }
  };

  return (
    <div className="AuthInputDiv">
      <label>이메일</label>
      <form className="AuthInputForm">
        <input
          type="email"
          value={email}
          maxLength={30}
          placeholder="zzan@zzan.com"
          className={`AuthInputShort ${emailError ? "border-info-red" : isCorrected ? "border-info-green" : ""}`}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className={`AuthDupButton ${email ? "bg-black" : " bg-[#C0C0C0]"}`}
          onClick={handleCheckDuplicate}
          disabled={!email}
        >
          중복체크
        </button>
      </form>
      {emailError && <p className="AuthStateInfo">{emailError}</p>}
    </div>
  );
}

export default EmailForm;
