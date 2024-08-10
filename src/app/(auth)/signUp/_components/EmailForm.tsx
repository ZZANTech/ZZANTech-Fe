"use client";

import { checkDuplication } from "@/apis/auth";
import Button from "@/components/Button";
import { checkEmailValidity } from "@/utils/authValidity";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

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

  const handleCheckDuplicate: React.MouseEventHandler<HTMLButtonElement> = async () => {
    //초기화
    setIsCorrected(null);
    setEmailError("");
    setEmailDup(null);

    //유효성 검사: 이메일 형식

    checkEmailValidity({ email, setEmailError });

    //유효성 검사: 중복확인
    if (!emailError) {
      try {
        checkDuplication(email);
      } catch (error) {
        console.log("error", error);
      }
      // let { data: users, error } = await supabase.from("users").select("*").eq("email", email);
      // if (users!.length > 0) {
      //   //users의 타입정의 필요
      //   setEmailError("이미 사용 중인 이메일입니다.");
      //   setEmailDup(false);
      //   return;
      // } else {
      //   setIsCorrected(true);
      //   setEmailDup(true);
      // }
    }
  };

  return (
    <div className="flex flex-col">
      <label>이메일</label>
      <form className="flex flex-row gap-2.5">
        <input
          type="email"
          value={email}
          maxLength={30}
          placeholder="zzan@zzan.com"
          className={`auth-input-short ${emailError ? "border-info-red" : isCorrected ? "border-info-green" : ""}`}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button size={"small"} disabled={!email} onClick={() => handleCheckDuplicate}>
          중복체크
        </Button>
      </form>
      {emailError && <p className="text-info-red text-xs">{emailError}</p>}
    </div>
  );
}

export default EmailForm;
