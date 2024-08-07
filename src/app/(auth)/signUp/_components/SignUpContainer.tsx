"use client";

import { signUp } from "@/apis/auth";
import EmailForm from "@/app/(auth)/signUp/_components/EmailForm";
import NicknameForm from "@/app/(auth)/signUp/_components/NicknameForm";
import PasswordForm from "@/app/(auth)/signUp/_components/PasswordForm";
import RecheckPasswordForm from "@/app/(auth)/signUp/_components/RecheckPasswordForm";
import useAlertModal from "@/hooks/useAlertModal";
import { TUserInsert } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SignUpContainer() {
  const [email, setEmail] = useState<string>("");
  const [emailDup, setEmailDup] = useState<boolean | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [nicknameDup, setNicknameDup] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean | null>(null);
  const router = useRouter();
  const modal = useAlertModal();

  // useEffect(() => {
  //   console.log("emailDup", emailDup);
  //   console.log("nicknameDup", nicknameDup);
  //   console.log("passwordValid", passwordValid);
  //   console.log("confirmPasswordValid>", confirmPasswordValid);
  //   console.log("전체", emailDup && nicknameDup && passwordValid && confirmPasswordValid);

  //   // if (emailDup && nicknameDup && passwordValid && confirmPasswordValid) {
  //   //   setIsFormValid(emailDup && nicknameDup && passwordValid && confirmPasswordValid);
  //   // }
  // }, [emailDup, nicknameDup, passwordValid, confirmPasswordValid]);

  const handleClickSignUp = async () => {
    console.log("emailDup", emailDup);
    console.log("nicknameDup", nicknameDup);
    console.log("passwordValid", passwordValid);
    console.log("confirmPasswordValid", confirmPasswordValid);
    console.log("같냐", confirmPassword === password);
    const data: TUserInsert = { email, nickname, password, confirmPassword };
    if (!(emailDup && nicknameDup && passwordValid && confirmPassword === password)) {
      modal.displayDefaultAlert("이메일 및 닉네임 중복확인, 비밀번호, 비밀번호 확인을 다시 확인해주세요.");
      return;
    }

    try {
      await signUp(data);
      modal.displayDefaultAlert("회원가입이 성공되었습니다.");
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
        <button
          className={`mx-auto w-[348px] h-14 px-4 text-center text-white rounded-lg ${emailDup && nicknameDup && passwordValid && confirmPassword === password ? "bg-black" : "bg-gray-400"}`}
          onClick={handleClickSignUp}
          disabled={!(emailDup && nicknameDup && passwordValid && confirmPassword === password)}
        >
          회원가입 완료하기
        </button>
      </div>
    </div>
  );
}

export default SignUpContainer;
