import { TChangePassword } from "@/types/user.type";
import { Dispatch, SetStateAction } from "react";
import { BASE_URL } from "@/constants";
import { TUserInsert } from "@/types/user.type";

export const logout = async () => {
  const response = await fetch("/api/auth/login", { method: "DELETE" });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "로그아웃 실패");
  }
  return response.json();
};

// 회원가입
export async function signUp(data: TUserInsert) {
  const response = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("회원가입에 실패했습니다.");
  }

  return response.json();
}

// 회원가입: 중복확인
export const checkDuplication = async (email: string) => {
  const res = await fetch("/api/auth/signup/duplication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });
};

//마이페이지 : 중복확인 및 update API
export const updateNickname = async (
  nickname: string,
  email: string | undefined,
  setNicknameError: Dispatch<SetStateAction<string>>,
  setIsNicknameValid: Dispatch<SetStateAction<boolean | null>>
) => {
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
  return res;
};

// 마이페이지 : 비밀번호 변경 apis
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
