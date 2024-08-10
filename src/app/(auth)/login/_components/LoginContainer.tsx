"use client";

import { checkEmailValidity, checkPasswordValidity } from "@/utils/authValidity";
import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/provider/contexts/ModalContext";
import { createClient } from "@/utils/supabase/client";
import { BASE_URL } from "@/constants";
import Button from "@/components/Button";

function LoginContainer() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const modal = useModal();
  const router = useRouter();
  const { user, logIn } = useUserContext();

  const handleLogin = async () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    checkEmailValidity({ email, setEmailError });
    checkPasswordValidity({ password, setPasswordError });
    setIsFormValid(email !== "" && password !== "");

    //로그인 서버 통신 로직
    try {
      await logIn(email, password);
    } catch (error: any) {
      modal.open({
        type: "alert",
        content: error.message
      });
    }
  };

  const validateInputs = () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    setIsFormValid(email !== "" && password !== "");
  };

  const handleSocialLogin = async (provider: "google" | "kakao") => {
    const supabase = createClient();
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${BASE_URL}/api/auth/callback`
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (user) {
      modal.open({
        type: "alert",
        content: "환영합니다.!"
      });
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center w-[320px] mx-auto p-3">
      <Image src={"/logos/mainLogo.png"} width={200} height={65} alt="mainLogo" className="mb-10" />
      <div className="flex flex-col">
        <input
          ref={emailRef}
          type="email"
          maxLength={40}
          className={`auth-input ${emailError ? "border-info-red" : ""}`}
          placeholder="이메일을 입력해주세요"
          onChange={validateInputs}
        />
      </div>

      <div className="flex flex-col">
        <input
          ref={passwordRef}
          type="password"
          maxLength={40}
          className={`auth-input ${passwordError ? "border-info-red" : ""}`}
          placeholder="비밀번호를 입력해주세요"
          onChange={validateInputs}
        />
      </div>

      <div className="w-[348px] h-4 px-3 mb-3">
        {(emailError || passwordError) && (
          <p className="text-info-red text-xs">이메일 또는 비밀번호가 잘못 되었습니다.</p>
        )}
      </div>

      <Button variant={"black"} size={"large"} rounded={"medium"} onClick={handleLogin} disabled={!isFormValid}>
        이메일로 계속하기
      </Button>

      <div className="container flex items-center gap-[87px] my-8">
        <div className="line flex-grow h-px bg-gray-400 line-shadow"></div>
        <div className="text text-gray-500 text-shadow">또는</div>
        <div className="line flex-grow h-px bg-gray-400 line-shadow"></div>
      </div>

      <Button
        variant={"kakaoyellow"}
        size={"large"}
        rounded={"medium"}
        className="mb-3"
        onClick={() => handleSocialLogin("kakao")}
      >
        <Image src={"/logos/kakao_black.png"} width={25} height={25} alt="kakao_black" />
        카카오로 계속하기
      </Button>

      <Button
        variant={"white"}
        size={"large"}
        rounded={"medium"}
        className="mb-10"
        onClick={() => handleSocialLogin("google")}
      >
        <Image src={"/logos/Google_color.png"} width={25} height={25} alt="Google_color" />
        Google로 계속하기
      </Button>

      <div className="flex flex-row gap-2.5 w-[340px] font-sm items-center justify-center mt-3">
        <p className="text-[#676767] font-semibold">아직 짠테크 회원이 아니신가요?</p>
        <Link href="/signUp" className="text-point font-semibold">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default LoginContainer;
