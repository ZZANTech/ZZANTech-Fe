"use client";

import Button from "@/components/Button";
import useChangePasswordMutation from "@/stores/queries/auth/useChangePasswordMutation";
import { TEditPasswordInputs } from "@/types/auth.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

function EditPassword() {
  const { updatePassword } = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty }
  } = useForm<TEditPasswordInputs>({
    mode: "onChange"
  });

  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const onSubmit: SubmitHandler<TEditPasswordInputs> = async (data) => {
    try {
      const oldPassword = data.oldPassword;
      const newPassword = data.password;
      await updatePassword({ oldPassword, newPassword });
    } catch (error: any) {
      return;
    }
  };

  return (
    <>
      {/* 작은 화면에서만 보이는 뒤로가기 버튼과 "비밀번호 변경?" */}
      <div className="lg:hidden flex items-center justify-between mt-8 mb-10">
        <button onClick={handleClose} className="pl-2">
          <Image src="/icons/quiz/back.svg" alt="뒤로가기" width={24} height={24} />
        </button>
        <h3 className="text-lg font-bold flex-grow text-center">비밀번호 변경</h3>
      </div>

      <div className="w-full h-full lg:w-[348px] lg:h-[412px] mx-auto lg:mt-20 flex flex-col items-center">
        <div className="hidden lg:block lg:w-full mb-12 flex justify-start pl-3">
          <h1 className="text-xl font-semibold">비밀번호 변경</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col box-border">
          <div className="flex flex-col mb-6">
            <label>기존 비밀번호</label>
            <input
              type="password"
              placeholder="최소 6~20자, 영어+숫자+특수문자 조합"
              className={`auth-input ${errors.oldPassword ? "border-info-red" : ""}`}
              maxLength={20}
              {...register("oldPassword", {
                required: "필수 사항 입니다.",
                // pattern: {
                //   value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{6,20}$/,
                //   message:
                //     "영어+숫자+특수문자(~!@#$%^&* 중 하나) 조합이어야 하며, 한글이나 허용된 특수문자 외의 문자는 사용할 수 없습니다."
                // },
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
            {errors.oldPassword && <span className="errors-message">{errors.oldPassword.message}</span>}
          </div>

          <div className="flex flex-col mb-6">
            <label>새 비밀번호</label>
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

          <div className="flex flex-col">
            <label>새 비밀번호 확인</label>
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

          <Button type="submit" size={"large"} weight={"semibold"} disabled={!isDirty || !isValid} className="mt-20">
            비밀번호 변경하기
          </Button>
        </form>
      </div>
    </>
  );
}

export default EditPassword;
