"use client";

import { signUp } from "@/apis/auth";
import EmailForm from "@/app/(auth)/signUp/_components/EmailForm";
import NicknameForm from "@/app/(auth)/signUp/_components/NicknameForm";
import Button from "@/components/Button";
import useAlertModal from "@/hooks/useAlertModal";
import { TUserInsert } from "@/types/user.type";
import { checkPasswordValidity } from "@/utils/authValidity";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignUpContainer() {
  const [email, setEmail] = useState<string>("");
  const [emailDup, setEmailDup] = useState<boolean | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [nicknameDup, setNicknameDup] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string>("");
  // const [isCorrected, setIsCorrected] = useState<boolean | null>(null);
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean | null>(null);
  const router = useRouter();
  const modal = useAlertModal();

  const handleClickSignUp = async () => {
    const data: TUserInsert = { email, nickname, password, confirmPassword };

    //유효성 검사: 비밀번호
    checkPasswordValidity({ password, setPasswordError });
    if (!passwordError) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
      return;
    }

    //유효성 검사: 비밀번호 확인
    if (password === confirmPassword) {
      setConfirmPasswordError("");
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordError("비밀번호와 일치하지 않습니다.");
      setConfirmPasswordValid(false);
    }

    // 모든 유효성이 통과 된 경우: signup api 통신
    if (!(emailDup && nicknameDup && passwordValid && confirmPasswordValid)) {
      modal.displayDefaultAlert("이메일/닉네임 중복확인 또는 비밀번호, 비밀번호 확인을 다시 확인해주세요.");
      return;
    }
    try {
      await signUp(data);
      modal.displayDefaultAlert("회원가입 성공!");
      router.replace("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-12">
      <h1 className="text-xl font-semibold">회원가입</h1>
      <div className="flex flex-col gap-6">
        <EmailForm email={email} setEmail={setEmail} setEmailDup={setEmailDup} />
        <NicknameForm nickname={nickname} setNickname={setNickname} setNicknameDup={setNicknameDup} />

        <div className="flex flex-col">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            maxLength={20}
            placeholder="최소 9~20자, 영어+숫자+특수문자 조합"
            className={`auth-input ${passwordError ? "border-info-red" : passwordValid ? "border-info-green" : ""}`}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-info-red text-xs">{passwordError}</p>
          <p className="text-info-green text-xs">{passwordError ? "" : passwordValid ? "사용 가능합니다" : ""}</p>
        </div>

        <div className="flex flex-col">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            maxLength={20}
            placeholder="최소 9~20자, 영어+숫자+특수문자 조합"
            className={`auth-input ${confirmPasswordError ? "border-info-red" : confirmPasswordValid ? "border-info-green" : ""}`}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className="text-info-red text-xs">{confirmPasswordError}</p>
          <p className="text-info-green text-xs">{confirmPasswordValid ? "비밀번호와 일치합니다" : ""}</p>
        </div>

        <Button size={"large"} rounded={"medium"} disabled={!(emailDup && nicknameDup)} onClick={handleClickSignUp}>
          회원가입 완료하기
        </Button>
      </div>
    </div>
  );
}

export default SignUpContainer;
