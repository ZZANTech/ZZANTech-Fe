import { TChangePassword } from "@/types/user.type";
import { Dispatch, SetStateAction } from "react";

export const logout = async () => {
  const response = await fetch("/api/auth/login", { method: "DELETE" });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "로그아웃 실패");
  }
  return response.json();
};

export const updateNickname = async (
  nickname: string,
  email: string | undefined,
  setNicknameError: Dispatch<SetStateAction<string>>,
  setIsNicknameValid: Dispatch<SetStateAction<boolean | null>>
) => {
  //중복확인 및 update API
  const res = await fetch("/api/auth/mypage/nickname", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nickname, email })
  });

  if (res.status === 409) {
    setNicknameError("동일한 닉네임이 있습니다.");
    setIsNicknameValid(false);
  }

  if (res.status === 401) {
    setNicknameError("401");
    setIsNicknameValid(false);
  }

  if (res.status === 500) {
    setNicknameError("500");
    setIsNicknameValid(false);
  }

  if (res.status === 200) {
    console.log("200");
    setNicknameError("");
    setIsNicknameValid(true);
  }
};

export const patchPassword = async (password: TChangePassword) => {
  const res = await fetch("/api/auth/mypage/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(password)
  });

  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.error;
    throw { message: errorMessage, status: res.status };
  }

  const data = await res.json();
  return data.message;
};
