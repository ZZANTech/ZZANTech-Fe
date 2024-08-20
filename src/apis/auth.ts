import { TChangePassword, TUser } from "@/types/user.type";
import { Dispatch, SetStateAction } from "react";
import { BASE_URL } from "@/constants";
import { TInputs } from "@/types/auth.types";

//로그아웃
export const logout = async () => {
  const res = await fetch("/api/auth/login", { method: "DELETE" });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "로그아웃 실패");
  }
  return res.json();
};

//회원가입
export async function signUp(data: TInputs) {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error("회원가입 실패!");
  }
  return res.json();
}

//회원가입(이메일): 중복확인
export const checkDuplication = async (email: string) => {
  const res = await fetch("/api/auth/signup/duplication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });
  if (res.status === 409) {
    return "이미 사용 중입니다";
  }
  return res.json();
};

//회원가입(닉네임): 중복확인
export const checkDuplicationNickname = async (nickname: string) => {
  const res = await fetch("/api/auth/signup/duplication/nickname", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nickname })
  });
  if (res.status === 409) {
    return "이미 사용 중입니다";
  }
  return res.json();
};

export const fetchUser = async (): Promise<TUser | null> => {
  const response = await fetch(`${BASE_URL}/api/auth/me`, { cache: "no-store" });

  const data = await response.json();

  return data.users || null;
};

//마이페이지 : nickname update
export const updateNickname = async (nickname: string, email: string | undefined) => {
  const res = await fetch("/api/auth/mypage/nickname", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nickname, email })
  });
  if (res.status === 401) {
    return "알 수 없는 에러(401)가 발생했습니다.";
  }
  if (res.status === 500) {
    return "알 수 없는 에러(500)가 발생했습니다.";
  }
  return res.json();
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
