import { Dispatch, SetStateAction } from "react";

// 로그인 : 이메일
export const checkEmailValidity = ({
  email,
  setEmailError
}: {
  email: string;
  setEmailError: Dispatch<SetStateAction<string>>;
}) => {
  if (!email) {
    setEmailError("이메일을 입력해주세요.");
    return;
  }
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    setEmailError("이메일 형식에 알맞게 입력해주세요.");
    return;
  }
  setEmailError("");
};

// 로그인 : 비밀번호
export const checkPasswordValidity = ({
  password,
  setPasswordError
}: {
  password: string;
  setPasswordError: Dispatch<SetStateAction<string>>;
}) => {
  if (!password) {
    setPasswordError("비밀번호를 입력해주세요.");
    return;
  }
  if (password.length < 6 || password.length > 20) {
    setPasswordError("비밀번호는 6자 이상 20자 이하이어야 합니다.");
    return;
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[~!@#$%^&*]/.test(password);
  if (!(hasLetter && hasDigit && hasSpecialChar)) {
    setPasswordError("영어, 숫자, 특수문자(~!@#$%^&*)를 모두 포함해야 합니다.");
    return;
  }
  setPasswordError("");
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
  if (/[^a-zA-Z0-9가-힣]/.test(nickname)) {
    setNicknameError("특수문자를 포함하거나 한글 자음/모음 단독 사용은 어렵습니다.");
    return;
  }
  setNicknameError("");
};
