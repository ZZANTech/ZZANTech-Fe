"use client";

import { signUp } from "@/apis/auth";
import EmailForm from "@/app/(auth)/signUp/_components/EmailForm";
import NicknameForm from "@/app/(auth)/signUp/_components/NicknameForm";
import PasswordForm from "@/app/(auth)/signUp/_components/PasswordForm";
import RecheckPasswordForm from "@/app/(auth)/signUp/_components/RecheckPasswordForm";
import { TUserInsert } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignUpContainer() {
  const [email, setEmail] = useState<string>("");
  const [emailDup, setEmailDup] = useState<boolean | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [nicknameDup, setNicknameDup] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleClickSignUp = async () => {
    const data: TUserInsert = { email, nickname, password, confirmPassword };
    try {
      await signUp(data);
      router.replace("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };
  const isFormValid = emailDup && nicknameDup && password && confirmPassword;

  return (
    <div className="flex flex-col justify-center gap-12">
      <h1 className="text-xl font-semibold">회원가입</h1>
      <div className="flex flex-col gap-6">
        <EmailForm email={email} setEmail={setEmail} setEmailDup={setEmailDup} />
        <NicknameForm nickname={nickname} setNickname={setNickname} setNicknameDup={setNicknameDup} />
        <PasswordForm password={password} setPassword={setPassword} />
        <RecheckPasswordForm
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          password={password}
        />
        <button
          className={`mx-auto w-[348px] h-14 px-4 text-center text-white rounded-lg ${isFormValid ? "bg-black" : "bg-gray-400"}`}
          onClick={handleClickSignUp}
          disabled={!isFormValid}
        >
          회원가입 완료하기
        </button>
      </div>
    </div>
  );
}

export default SignUpContainer;
