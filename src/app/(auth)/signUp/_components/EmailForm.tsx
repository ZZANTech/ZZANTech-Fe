"use client";

import { checkDuplication } from "@/apis/auth";
import Button from "@/components/Button";
import { useModal } from "@/provider/contexts/ModalContext";
import { checkEmailValidity } from "@/utils/authValidity";
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
  const modal = useModal();

  const handleCheckDuplicate: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    //초기화
    setIsCorrected(null);
    setEmailError("");
    setEmailDup(null);

    //유효성 검사: 이메일 형식
    // checkEmailValidity({ email, setEmailError });

    //유효성 검사: 중복확인
    if (emailError) {
      console.log("emailError", emailError);
      return;
    }

    if (!emailError) {
      try {
        checkDuplication({ email, setEmailError, setIsCorrected });
        setEmailDup(isCorrected);
      } catch (error) {
        console.log("error", error);
      }
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
          onChange={(e) => {
            setEmail(e.target.value);
            checkEmailValidity({ email, setEmailError });
          }}
        />
        <Button size={"small"} disabled={emailError.length > 1 || email === ""} onClick={handleCheckDuplicate}>
          중복체크
        </Button>
      </form>
      <p className="text-info-red text-xs">{emailError}</p>
      <p className="text-info-green text-xs">{emailError ? "" : isCorrected ? "사용 가능합니다" : ""}</p>
    </div>
  );
}

export default EmailForm;
