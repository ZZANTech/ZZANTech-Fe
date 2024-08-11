import { TChangePassword, TUser } from "@/types/user.type";
import { Dispatch, SetStateAction } from "react";
import { BASE_URL } from "@/constants";
import { TUserInsert } from "@/types/user.type";

//로그아웃
export const logout = async () => {
  const res = await fetch("/api/auth/login", { method: "DELETE" });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "로그아웃 실패");
  }
  return res.json();
};

// 회원가입
export async function signUp(data: TUserInsert) {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("회원가입에 실패했습니다.");
  }

  return res.json();
}

// 회원가입: 중복확인 : 이메일
export const checkDuplication = async ({
  email,
  setEmailError
}: {
  email: string;
  setEmailError: Dispatch<SetStateAction<string>>;
}) => {
  const res = await fetch("/api/auth/signup/duplication", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });
  if (res.status === 409) {
    setEmailError("이미 사용 중입니다.");
  }
  if (res.status === 200) {
    setEmailError("");
  }
  return res.json();
};

// 회원가입: 중복확인 : 닉네임
export const checkDuplicationNickname = async ({
  nickname,
  setNicknameError
}: {
  nickname: string;
  setNicknameError: Dispatch<SetStateAction<string>>;
}) => {
  const res = await fetch("/api/auth/signup/duplication/nickname", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nickname })
  });

  if (res.status === 409) {
    setNicknameError("이미 사용 중입니다.");
  }
  if (res.status === 200) {
    setNicknameError("");
  }
  return res.json();
};

export const fetchUser = async (): Promise<TUser | null> => {
  const response = await fetch(`${BASE_URL}/api/auth/me`, { cache: "no-store" });
  const data = await response.json();
  return data.users || null;
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
    setNicknameError("이미 사용 중입니다.");
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
