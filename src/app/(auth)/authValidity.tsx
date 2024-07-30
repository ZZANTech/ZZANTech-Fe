//유효성 검사

import { Dispatch, SetStateAction } from "react";

export const checkEmailValidity = ({
  email,
  setEmailMessage,
  setEmailError
}: {
  email: string;
  setEmailMessage: () => Dispatch<SetStateAction<string>>;
  setEmailError: () => Dispatch<SetStateAction<string>>;
}) => {
  if (!email) {
    setEmailMessage("");
    setEmailError("빈칸을 채워주세요.");
    return;
  }

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    setEmailMessage("");
    setEmailError("이메일 형식이 아닙니다.");
    return;
  }

  if (email) {
    setEmailMessage("이메일 성공");
    setEmailError("");
  }
};

export const checkPasswordValidity = ({
  password,
  setPasswordMessage,
  setPasswordError
}: {
  password: string;
  setPasswordMessage: () => Dispatch<SetStateAction<string>>;
  setPasswordError: () => Dispatch<SetStateAction<string>>;
}) => {
  if (!password) {
    setPasswordMessage("");
    setPasswordError("빈칸을 채워주세요.");
    return;
  }

  if (password.length < 5 || password.length > 20) {
    setPasswordMessage("");
    setPasswordError("비밀번호는 6자 이상 20자 이하이어야 합니다.");
    return;
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    setPasswordMessage("");
    setPasswordError("비밀번호에는 특수문자를 사용할 수 없습니다.");
    return;
  }

  if (password) {
    setPasswordMessage("비밀번호 성공");
    setPasswordError("");
  }
};
