"use client";

import { signUp } from "@/apis/auth";
import EmailForm from "@/app/(auth)/signUp/_components/EmailForm";
import NicknameForm from "@/app/(auth)/signUp/_components/NicknameForm";
import PasswordForm from "@/app/(auth)/signUp/_components/PasswordForm";
import RecheckPasswordForm from "@/app/(auth)/signUp/_components/RecheckPasswordForm";
import Button from "@/components/Button";
import useAlertModal from "@/hooks/useAlertModal";
import { TUserInsert } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignUpContainer() {
  const [email, setEmail] = useState<string>("");
  const [emailDup, setEmailDup] = useState<boolean | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [nicknameDup, setNicknameDup] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean | null>(null);
  const router = useRouter();
  const modal = useAlertModal();

  const handleClickSignUp = async () => {
    const data: TUserInsert = { email, nickname, password, confirmPassword };
    if (!(emailDup && nicknameDup && passwordValid && confirmPassword === password)) {
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
        <PasswordForm password={password} setPassword={setPassword} setPasswordValid={setPasswordValid} />
        <RecheckPasswordForm
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          password={password}
          setConfirmPasswordValid={setConfirmPasswordValid}
        />
        <Button
          size={"large"}
          rounded={"medium"}
          disabled={!(emailDup && nicknameDup && passwordValid && confirmPassword === password)}
          onClick={handleClickSignUp}
        >
          회원가입 완료하기
        </Button>
      </div>
    </div>
  );
}

export default SignUpContainer;
