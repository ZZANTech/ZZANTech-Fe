import useAlertModal from "@/hooks/useAlertModal";
import { TEditPasswordInputs } from "@/types/auth.types";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function EditPassword() {
  const router = useRouter();
  const modal = useAlertModal();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<TEditPasswordInputs>();

  const onSubmit: SubmitHandler<TEditPasswordInputs> = async (data) => {
    try {
      await signUp(data);
      modal.displayDefaultAlert("회원가입 성공!");
      router.replace("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="w-[348px] h-[412px] mx-auto mt-[100pt]">
      <h1 className="font-xl font-semibold mb-12 leading-7">비밀번호 변경</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col box-border ">
        <div className="flex flex-col mb-6">
          <label>기존 비밀번호</label>
          <input
            type="password"
            placeholder="최소 6~20자, 영어+숫자+특수문자 조합"
            className={`auth-input ${errors.oldPassword ? "border-info-red" : ""}`}
            maxLength={20}
            {...register("oldPassword", {
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

        <div className="flex flex-col mb-6">
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
      </form>
    </div>
  );
}

export default EditPassword;
