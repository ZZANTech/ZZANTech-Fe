"use client";

import { checkDuplication, checkDuplicationNickname, signUp } from "@/apis/auth";
import Button from "@/components/Button";
import { useModal } from "@/provider/contexts/ModalContext";
import { TInputs } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

function SignUpContainer() {
  const router = useRouter();
  const { close, open } = useModal();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty }
  } = useForm<TInputs>({
    mode: "onChange"
  });
  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    try {
      await signUp(data);
      open({ type: "alert", content: "회원가입 성공!" });
      router.replace("/login");
    } catch (error) {
      if (error instanceof Error) {
        open({ type: "alert", content: error.message });
      } else {
        console.log("error", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[348px] flex flex-col items-center mx-auto mt-5 lg:mt-[102px]">
      <div className="hidden lg:block lg:w-full mb-12 ">
        <h1 className="flex justify-start text-xl font-semibold">회원가입</h1>
      </div>

      <div className="flex flex-col mb-6">
        <label>이메일</label>
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
            maxLength: 30,
            validate: {
              checkUrl: async (email) => await checkDuplication(email)
            }
          })}
        />
        {errors.email && <span className="errors-message">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col mb-6">
        <label>닉네임</label>
        <input
          type="text"
          placeholder="최소 2~7자 한글, 영어, 슷자"
          className={`auth-input ${errors.nickname ? "border-info-red" : ""}`}
          maxLength={7}
          {...register("nickname", {
            required: "필수 사항 입니다.",
            pattern: {
              value: /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,7}$/,
              message: "특수문자를 포함하거나 한글 자음/모음 단독 사용은 어렵습니다."
            },
            minLength: 3,
            maxLength: 7,
            validate: {
              checkUrl: async (nickname) => await checkDuplicationNickname(nickname)
            }
          })}
        />
        {errors.nickname && <span className="errors-message">{errors.nickname.message}</span>}
      </div>

      <div className="flex flex-col mb-6">
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="최소 6~20자, 영어, 숫자, 특수문자 조합"
          className={`auth-input ${errors.password ? "border-info-red" : ""}`}
          maxLength={20}
          {...register("password", {
            required: "필수 사항 입니다.",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{6,20}$/,
              message: "영어, 숫자, 특수문자를 조합해야 합니다."
            },
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
        {errors.password && <span className="errors-message">{errors.password.message}</span>}
      </div>

      <div className="flex flex-col mb-6">
        <label>비밀번호 확인</label>
        <input
          type="password"
          placeholder="최소 6~20자, 영어, 숫자, 특수문자 조합"
          className={`auth-input ${errors.confirmPassword ? "border-info-red" : ""}`}
          maxLength={20}
          {...register("confirmPassword", {
            required: "필수 사항 입니다.",
            minLength: {
              value: 6,
              message: "비밀번호는 최소 6자 이상이어야 합니다."
            },
            maxLength: {
              value: 20,
              message: "비밀번호는 최대 20자 이하이어야 합니다."
            },
            validate: (value) => value === watch("password") || "비밀번호와 일치하지 않습니다."
          })}
        />
        {errors.confirmPassword && <span className="errors-message">{errors.confirmPassword.message}</span>}
      </div>

      <Button size={"large"} rounded={"medium"} type="submit" disabled={!isDirty || !isValid}>
        회원가입 완료하기
      </Button>
    </form>
  );
}

export default SignUpContainer;
