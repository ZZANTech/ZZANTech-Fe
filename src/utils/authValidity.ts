import { Dispatch, SetStateAction } from "react";

// 로그인 : 이메일
export const checkEmailValidity = ({
  email,
  setEmailMessage,
  setEmailError
}: {
  email: string;
  setEmailMessage: Dispatch<SetStateAction<string>>;
  setEmailError: Dispatch<SetStateAction<string>>;
}) => {
  if (!email) {
    setEmailMessage("");
    setEmailError("이메일을 입력해주세요.");
    return;
  }

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    setEmailMessage("");
    setEmailError("유효한 이메일 형식이 아닙니다.");
    return;
  }

  if (email) {
    setEmailMessage("유효한 이메일입니다.");
    setEmailError("");
  }
};

// 로그인 : 비밀번호
export const checkPasswordValidity = ({
  password,
  setPasswordMessage,
  setPasswordError
}: {
  password: string;
  setPasswordMessage: Dispatch<SetStateAction<string>>;
  setPasswordError: Dispatch<SetStateAction<string>>;
}) => {
  if (!password) {
    setPasswordMessage("");
    setPasswordError("비밀번호를 입력해주세요.");
    return;
  }

  if (password.length < 5 || password.length > 20) {
    setPasswordMessage("");
    setPasswordError("비밀번호는 6자 이상 20자 이하이어야 합니다.");
    return;
  }

  if (password) {
    setPasswordMessage("유효한 비밀번호입니다.");
    setPasswordError("");
  }
};

// 마이페이지: 닉네임 변경
export const checkNicknameValidity = ({
  nickname,
  setNicknameError
}: {
  nickname: string;
  setNicknameError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  if (!nickname) {
    setNicknameError("빈칸을 채워주세요.");
    return;
  }

  if (nickname.length < 2 || nickname.length > 8) {
    setNicknameError("닉네임은 2자 이상 7자 이하이어야 합니다.");
    return;
  }

  setNicknameError("");
};
