"use client";

import { checkEmailValidity, checkPasswordValidity } from "@/app/(auth)/authValidity";
import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

function TestLogin() {
  const [email, setEmail] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const router = useRouter();
  const { user, logIn } = useUserContext();

  const handleLogin = async () => {
    //로그인 서버 통신 로직
    await logIn(email, password);
    if (user) {
      setLoginSuccess(true);
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      router.replace("/");
    }
  }, [loginSuccess]);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailMessage("");
    setEmailError("");
  };

  useEffect(() => {
    checkEmailValidity({ email, setEmailMessage, setEmailError });
  }, [email]);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordMessage("");
    setPasswordError("");
  };

  useEffect(() => {
    checkPasswordValidity({ password, setPasswordMessage, setPasswordError });
  }, [password]);

  return (
    <div className="flex flex-col items-center w-[340px] mx-auto p-10 gap-2.5">
      <Image src={"/logos/mainLogo.png"} width={300} height={100} alt="mainLogo" />
      <div className="AuthInputDiv">
        <label>이메일</label>
        <input
          type="email"
          maxLength={20}
          value={email}
          className="AuthInput"
          placeholder="이메일을 입력해주세요"
          onChange={(e) => handleEmail(e)}
        />
        {emailMessage && <p className="AuthStateInfoGreen">{emailMessage}</p>}
        {emailError && <p className="AuthStateInfo">{emailError}</p>}
      </div>

      <div className="AuthInputDiv">
        <label>비밀번호</label>
        <input
          type="password"
          maxLength={20}
          value={password}
          className="AuthInput"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => handlePassword(e)}
        />
        {passwordMessage && <p className="AuthStateInfoGreen">{passwordMessage}</p>}
        {passwordError && <p className="AuthStateInfo">{passwordError}</p>}
      </div>

      <button onClick={handleLogin} className="AuthLoginButton bg-[#111111] text-white">
        이메일로 계속하기
      </button>

      <div>---------------- 또는 ----------------</div>

      <div className="AuthLoginButton bg-[#FDE500]">
        <Image src={"/logos/kakao_black.png"} width={25} height={25} alt="kakao_black" />
        카카오로 계속하기
      </div>

      <div className="AuthLoginButton border border-[#CCCCC6]">
        <Image src={"/logos/Google_color.png"} width={25} height={25} alt="Google_color" />
        Google로 계속하기
      </div>

      <div className="flex flex-row gap-2.5 w-[340px] font-sm items-center justify-center">
        <p>아직 짠테크 회원이 아니신가요?</p>
        <Link href="/signUp" className="text-[#FF6000] hover:font-bold">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default TestLogin;
