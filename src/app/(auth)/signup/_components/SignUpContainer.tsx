"use client";

import { checkDuplication, checkDuplicationNickname, signUp } from "@/apis/auth";
import Button from "@/components/Button";
import useAlertModal from "@/hooks/useAlertModal";
import { TInputs } from "@/types/auth.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

function SignUpContainer() {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  const modal = useAlertModal();
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
      modal.displayDefaultAlert("회원가입 성공!");
      router.replace("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div>
        {/* 작은 화면에서만 보이는 뒤로가기 버튼과 "회원가입" */}
        <div className="lg:hidden flex items-center justify-between my-8">
          <button onClick={handleClose} className="pl-2">
            <Image src="/icons/quiz/back.svg" alt="뒤로가기" width={24} height={24} />
          </button>
          <h3 className="text-lg font-bold flex-grow text-center">회원가입</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-[348px] flex flex-col items-center lg:mx-auto ">
        <div className="hidden lg:block lg:w-full mt-[102px] mb-12 flex justify-start">
          <h1 className="text-xl font-semibold">회원가입</h1>
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
            placeholder="최소 6~20자, 영어+숫자+특수문자 조합"
            className={`auth-input ${errors.password ? "border-info-red" : ""}`}
            maxLength={20}
            {...register("password", {
              required: "필수 사항 입니다.",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{6,20}$/,
                message:
                  "영어+숫자+특수문자(~!@#$%^&* 중 하나) 조합이어야 하며, 한글이나 허용된 특수문자 외의 문자는 사용할 수 없습니다."
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
            placeholder="최소 6~20자, 영어+숫자+특수문자 조합"
            className={`auth-input ${errors.confirmPassword ? "border-info-red" : ""}`}
            maxLength={20}
            {...register("confirmPassword", {
              required: "필수 사항 입니다.",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{6,20}$/,
                message:
                  "영어+숫자+특수문자(~!@#$%^&* 중 하나) 조합이어야 하며, 한글이나 허용된 특수문자 외의 문자는 사용할 수 없습니다."
              },
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
    </div>
  );
}

export default SignUpContainer;
