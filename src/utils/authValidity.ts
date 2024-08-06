import { Dispatch, SetStateAction } from "react";

//이메일 유효성검사(중복확인 제외)
export const checkEmailValidity = ({
  email,
  setEmailError
}: {
  email: string;
  setEmailError: Dispatch<SetStateAction<string>>;
}) => {
  //빈칸일 경우
  if (!email) {
    setEmailError("이메일을 입력해주세요.");
    return;
  }
  //이메일 형식이 아닐 경우
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    setEmailError("이메일 형식이 아닙니다. (예: zzan123@gmail.com");
    return;
  }
};

//비밀번호 유효성검사
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
  if (password.length < 5 || password.length > 40) {
    setPasswordError("비밀번호는 6자 이상이어야 합니다.");
    return;
  }
};

//비밀번호 확인 유효성검사
export const checkRecheckedPasswordValidity = ({
  password,
  recheckedPassword,
  setRecheckedPasswordError
}: {
  password: string;
  recheckedPassword: string;
  setRecheckedPasswordError: Dispatch<SetStateAction<string>>;
}) => {
  if (!recheckedPassword) {
    setRecheckedPasswordError("비밀번호를 입력해주세요.");
    return;
  }
  if (recheckedPassword.length < 5 || recheckedPassword.length > 40) {
    setRecheckedPasswordError("비밀번호는 6자 이상이어야 합니다.");
    return;
  }
  if (password !== recheckedPassword) {
    setRecheckedPasswordError("비밀번호와 일치하지 않습니다.");
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
