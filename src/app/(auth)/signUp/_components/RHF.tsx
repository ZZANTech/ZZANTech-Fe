"use client";

import { errorMonitor } from "events";
import { SubmitHandler, useForm } from "react-hook-form";

type TInputs = {
  email: string;
  nickname?: string;
  password?: string;
  recheckedPassword?: string;
};

function Test() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = (data) => console.log(data);

  const checkEmailduplication = (email: string) => {
    console.log("잘 찍히나 봅시다");
    return true;
  };

  console.log(errors.nickname);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[350px] flex flex-col mx-auto my-auto items-center justify-center gap-2"
    >
      <div className="flex flex-col">
        <label>이메일</label>
        <input
          type="email"
          placeholder="zzan@zzan.com"
          className="auth-input"
          maxLength={30}
          {...register("email", {
            required: "이메일 형식",
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            maxLength: 40,
            validate: (email) => checkEmailduplication(email) || "이미 사용 중인 이메일입니다."
          })}
        />
        {errors.email && <span className="text-info-red text-xs">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col">
        <label>닉네임</label>
        <input
          type="nickname"
          placeholder="최소 2~7자 한글, 영어, 슷자"
          className="auth-input"
          maxLength={7}
          {...register("nickname", {
            required: "최소 2~7자 한글, 영어, 슷자",
            pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
            minLength: 3,
            maxLength: 7
          })}
        />
        {errors.nickname && <span className="text-info-red text-xs">{errors.nickname.message}</span>}
      </div>

      <div className="flex flex-col">
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="최소 9~20자, 영어+숫자+특수문자 조합"
          className="auth-input"
          maxLength={20}
          {...register("password", {
            required: "최소 9~20자, 영어+숫자+특수문자 조합",
            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*]).+$/,
            minLength: 6
          })}
        />
        {errors.password && <span className="text-info-red text-xs">{errors.password.message}</span>}
      </div>

      <div className="flex flex-col">
        <label>비밀번호 확인</label>
        <input
          type="password"
          placeholder="최소 9~20자, 영어+숫자+특수문자 조합"
          className="auth-input"
          maxLength={20}
          {...register("recheckedPassword", {
            required: "최소 9~20자, 영어+숫자+특수문자 조합",
            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*]).+$/,
            minLength: 6
            // validate: (recheckedPassword) => recheckedPassword !== password || "비밀번호와 일치하지 않습니다."
          })}
        />
        {errors.recheckedPassword && <span className="text-info-red text-xs">{errors.recheckedPassword.message}</span>}
      </div>

      <button type="submit">회원가입 하기</button>
    </form>
  );
}

export default Test;
