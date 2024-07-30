"use client";

import { signUp } from "@/apis/signup";
import EmailForm from "@/app/(auth)/signUp/_components/EmailForm";
import NicknameForm from "@/app/(auth)/signUp/_components/NicknameForm";
import PasswordForm from "@/app/(auth)/signUp/_components/PasswordForm";
import RecheckPasswordForm from "@/app/(auth)/signUp/_components/RecheckPasswordForm";
import { TUserInsert } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignUpContainer() {
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
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
  const isFormValid = email && nickname && password && confirmPassword;

  return (
    <div className="flex flex-col items-center w-[800px] mx-auto my-10 p-10">
      <h1 className="text-2xl text-bold">회원가입</h1>
      <section>
        <EmailForm email={email} setEmail={setEmail} />
        <NicknameForm nickname={nickname} setNickname={setNickname} />
        <PasswordForm password={password} setPassword={setPassword} />
        <RecheckPasswordForm
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          password={password}
        />
      </section>
      <button
        className={`w-[400px] h-14 p-2.5 text-center text-white rounded-lg ${isFormValid ? "bg-black" : "bg-gray-400"}`}
        onClick={handleClickSignUp}
        disabled={!isFormValid}
      >
        회원가입 완료하기
      </button>
    </div>
  );
}

export default SignUpContainer;
