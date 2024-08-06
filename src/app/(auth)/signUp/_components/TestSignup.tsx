"use client";

import { checkEmailDuplication, checkNicknameDuplication } from "@/apis/auth";
import { useModal } from "@/provider/contexts/ModalContext";
import {
  checkEmailValidity,
  checkNicknameValidity,
  checkPasswordValidity,
  checkRecheckedPasswordValidity
} from "@/utils/authValidity";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

function TestSignup() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isEmailDuplicate, setIsEmailDuplicate] = useState<boolean | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [recheckedPassword, setRecheckedPassword] = useState<string>("");
  const [recheckedPasswordError, setRecheckedPasswordError] = useState<string>("");
  const router = useRouter();
  const modal = useModal();
  const activeButton = email && nickname && password && recheckedPassword;

  const handleClickSignUpButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!emailError && !nicknameError) {
    //   try {
    //     const emailRes = await checkEmailDuplication(email, setEmailError);
    //     console.log("emailRes >>", emailRes);
    //     const nicknameRes = await checkNicknameDuplication(nickname, setNicknameError);
    //     // if (!emailError && !nicknameError) {
    //     //   console.log("회원가입 성공");
    //     // }
    //   } catch (error) {
    //     console.error("회원가입 실패:", error);
    //   }
    // }
  };

  const handleClickDupEmail = async (e: FormEvent) => {
    e.preventDefault();
    // setNicknameError("");
    //   //중복확인 api
    //   try {
    //     const emailRes = await checkEmailDuplication(email, setEmailError);
    //     console.log("emailRes >>", emailRes);
    //     // if (!emailError && !nicknameError) {
    //     //   console.log("회원가입 성공");
    //     // }
    //   } catch (error) {
    //     console.error("중복확인 실패", error);
    //   }
    // }
  };

  const handleClickDupNickname = () => {
    //중복확인 api
  };

  useEffect(() => {
    setEmailError("");
    checkEmailValidity({ email, setEmailError });
  }, [email]);

  useEffect(() => {
    setNicknameError("");
    checkNicknameValidity({ nickname, setNicknameError });
  }, [nickname]);

  useEffect(() => {
    setPasswordError("");
    checkPasswordValidity({ password, setPasswordError });
  }, [password]);

  useEffect(() => {
    setRecheckedPasswordError("");
    checkRecheckedPasswordValidity({ password, recheckedPassword, setRecheckedPasswordError });
  }, [recheckedPassword]);

  return (
    <form onSubmit={handleClickSignUpButton}>
      <section>
        <label>이메일</label>
        <input
          type="email"
          value={email}
          maxLength={40}
          placeholder="이메일을 입력해주세요"
          className={`auth-input-short ${emailError ? "border-info-red" : ""}`}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p>{emailError}</p>}
        <button className="auth-dup-button" onClick={handleClickDupEmail} disabled={!email}>
          중복확인
        </button>
      </section>

      <section>
        <label>닉네임</label>
        <input
          type="text"
          value={nickname}
          maxLength={40}
          placeholder="닉네임 을 입력해주세요"
          className={`auth-input-short ${nicknameError ? "border-info-red" : ""}`}
          onChange={(e) => setNickname(e.target.value)}
        />
        {nicknameError && <p>{nicknameError}</p>}
        <button className="auth-dup-button" onClick={handleClickDupNickname} disabled={!nickname}>
          중복확인
        </button>
      </section>

      {/*비밀번호 */}
      <section>
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          maxLength={40}
          placeholder="비밀번호를 입력해주세요"
          className={`auth-input-short ${passwordError ? "border-info-red" : ""}`}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p>{passwordError}</p>}
      </section>

      <section>
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={recheckedPassword}
          maxLength={40}
          placeholder="비밀번호를 입력해주세요"
          className={`auth-input-short ${recheckedPasswordError ? "border-info-red" : ""}`}
          onChange={(e) => setRecheckedPassword(e.target.value)}
        />
        {recheckedPasswordError && <p>{recheckedPasswordError}</p>}
      </section>

      {/*전체약관 */}
      <section></section>

      <button
        type="submit"
        className={`mx-auto w-[348px] h-14 px-4 text-center text-white rounded-lg ${activeButton ? "bg-black" : "bg-gray-400"}`}
        disabled={!activeButton}
      >
        회원가입 하기
      </button>
    </form>
  );
}

export default TestSignup;
