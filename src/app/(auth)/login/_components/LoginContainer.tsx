"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import LoginEmailForm from "./LoginEmailForm";
import LoginPasswordForm from "./LoginPasswordForm";
import { useUserContext } from "@/provider/contexts/userContext";

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

  return (
    <div className="flex flex-col items-center w-[800px] mx-auto my-10 p-10">
      <Link href="/">짠테크 로고</Link>
      <form>
        <LoginEmailForm email={email} setEmail={setEmail} />
        <LoginPasswordForm password={password} setPassword={setPassword} />
        <button className="w-100% p-2.5 text-center text-white bg-black" onClick={handleClickLogin}>
          로그인
        </button>
      </form>

      <div className="flex flex-col w-[500px] gap-2.5 p-2.5 items-center">
        <Link href="/signIn" className="w-[400px] p-2.5 text-center text-white bg-yellow-500">
          카카오로 계속하기
        </Link>
        <Link href="/signIn" className="w-[400px] p-2.5 text-center text-white bg-blue-500">
          Google로 계속하기
        </Link>
        <div className="flex flex-row gap-2.5">
          <p>아직 회원이 아니신가요?</p>
          <Link href="/signUp" className="text-blue-500">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
