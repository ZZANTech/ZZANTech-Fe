"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { TLoginInputs } from "@/types/auth.types";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { BASE_URL } from "@/constants";
import { useUserContext } from "@/provider/contexts/UserContext";
import { revalidateRoute } from "@/utils/revalidation";
import { useModal } from "@/provider/contexts/ModalContext";
import useAlertModal from "@/hooks/useAlertModal";

function LogInContainer() {
  const router = useRouter();
  const { user, logIn } = useUserContext();
  const { close, open } = useModal();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<TLoginInputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<TLoginInputs> = async (data) => {
    const email = data.email as string;
    const password = data.password as string;
    try {
      await logIn(email, password);
    } catch (error) {
      if (error instanceof Error) {
        open({ type: "alert", content: error.message });
      } else {
        console.log("error", error);
      }
    }
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
      if (error instanceof Error) {
        open({ type: "alert", content: error.message });
      } else {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      revalidateRoute("/", "layout");
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center w-80 mx-auto mt-3 lg:mt-[60px]">
      <Image src={"/logos/mainLogo.png"} width={200} height={65} alt="mainLogo" className="mb-10" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <input
            type="email"
            placeholder="zzan@zzan.com"
            className={`auth-input ${errors.email ? "border-info-red" : ""}`}
            maxLength={30}
            {...register("email", {
              required: "필수 사항 입니다.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "이메일 형식이 아닙니다."
              },
              maxLength: 30
            })}
          />

          <input
            type="password"
            placeholder="최소 6~20자, 영어, 숫자, 특수문자 조합"
            className={`auth-input ${errors.password ? "border-info-red" : ""}`}
            minLength={6}
            maxLength={20}
            {...register("password", {
              required: "필수 사항 입니다.",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다."
              },
              maxLength: {
                value: 20,
                message: "비밀번호는 최대 20자 이하이어야 합니다."
              }
            })}
          />
        </div>

        <Button variant={"black"} size={"large"} rounded={"medium"} type="submit">
          이메일로 계속하기
        </Button>
      </form>

      <div className="container flex items-center gap-[87px] my-8">
        <div className="line flex-grow h-px bg-gray-400 line-shadow"></div>
        <div className="text text-gray-500 text-shadow">또는</div>
        <div className="line flex-grow h-px bg-gray-400 line-shadow"></div>
      </div>

      <Button
        variant={"kakaoyellow"}
        size={"large"}
        rounded={"medium"}
        weight={"semibold"}
        className="mb-3"
        onClick={() => handleSocialLogin("kakao")}
      >
        <Image src={"/logos/Kakao_black.png"} width={25} height={25} alt="kakao_black" />
        <p className="pl-1">카카오로 계속하기</p>
      </Button>

      <Button
        variant={"white"}
        size={"large"}
        rounded={"medium"}
        weight={"semibold"}
        className="mb-10"
        onClick={() => handleSocialLogin("google")}
      >
        <Image src={"/logos/Google_color.png"} width={25} height={25} alt="Google_color" />
        <p className="pl-1">Google로 계속하기</p>
      </Button>

      <div className="flex flex-row gap-2.5 w-[340px] font-sm items-center justify-center mt-3">
        <p className="text-[#676767] font-semibold">아직 짠테크 회원이 아니신가요?</p>
        <Link href="/signup" className="text-point font-semibold">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default LogInContainer;
