"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import { useUserContext } from "@/provider/contexts/UserContext";
import LoginEmailForm from "@/app/(auth)/login/_components/LoginEmailForm";
import LoginPasswordForm from "@/app/(auth)/login/_components/LoginPasswordForm";

function LoginContainer() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { logIn } = useUserContext();

  const handleClickLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    logIn(email, password);
    router.replace("/");
  };

  const handleClickKakaoLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    // logIn(email, password);
    // router.replace("/");
  };

  return (
    <div className="flex flex-col items-center w-[340px] mx-auto my-10 p-10 gap-2.5">
      <h1>로그인</h1>
      <form>
        <LoginEmailForm email={email} setEmail={setEmail} />
        <LoginPasswordForm password={password} setPassword={setPassword} />
        <button className="AuthLoginButton bg-[#111111] text-white" onClick={handleClickLogin}>
          이메일로 계속하기
        </button>
      </form>
      <div className="AuthLoginButton">---------------- 또는 ----------------</div>
      <button className="AuthLoginButton bg-[#FDE500]" onClick={handleClickKakaoLogin}>
        카카오로 계속하기
      </button>
      <button className="AuthLoginButton border border-[#CCCCC6]">Google로 계속하기</button>
      <div className="flex flex-row gap-2.5 w-[340px] font-sm items-center justify-center">
        <p>아직 짠테크 회원이 아니신가요?</p>
        <Link href="/signUp" className="text-[#FF6000] hover:font-bold">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default LoginContainer;
