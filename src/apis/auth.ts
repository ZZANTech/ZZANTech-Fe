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
  userId: string | undefined,
  setNicknameError: Dispatch<SetStateAction<string>>,
  setIsNicknameValid: Dispatch<SetStateAction<boolean>>
) => {
  //중복확인 및 update API
  const res = await fetch("/api/auth/mypage/nickname", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nickname, userId })
  });

  if (res.status === 409) {
    setNicknameError("동일한 닉네임이 있습니다.");
    setIsNicknameValid(false);
  }
  if (res.status === 500) {
    setNicknameError("알 수 없는 에러가 발생 했습니다.");
    setIsNicknameValid(false);
  }
  if (res.status === 200) {
    console.log("닉네임 변경 성공");
    setNicknameError("");
    setIsNicknameValid(true);
  }
};

export const resetPassword = async (email: string) => {
  const res = await fetch("/api/auth/mypage/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(email)
  });

  const result = await res.json();
  if (res.ok) {
    // console.log("resetPassword >> ", result);
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
