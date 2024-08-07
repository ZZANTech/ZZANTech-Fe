import { TChangePassword } from "@/types/user.type";
import { Dispatch, SetStateAction } from "react";
import { BASE_URL } from "@/constants";
import { TUserInsert } from "@/types/user.type";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

//로그아웃
export const logout = async () => {
  const response = await fetch("/api/auth/login", { method: "DELETE" });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "로그아웃 실패");
  }
  return response.json();
};

//중복확인 : 이메일
export async function checkEmailDuplication(email: string, setEmailError: Dispatch<SetStateAction<string>>) {
  const res = await fetch(`${BASE_URL}/api/auth/signup/duplication/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(email)
  });

  if (res.status === 409) {
    setEmailError("동일한 이메일이 있습니다.");
  }
}

//중복확인 : 이메일
export async function checkNicknameDuplication(nickname: string, setNicknameError: Dispatch<SetStateAction<string>>) {
  const res = await fetch(`${BASE_URL}/api/auth/signup/duplication/nickname`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nickname)
  });
  if (res.status === 409) {
    setNicknameError("동일한 닉네임이 있습니다.");
  }
}

//회원가입
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

//마이페이지 : 비밀번호 변경 apis
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

//소셜로그인: 카카오톡
// export const signInWithKakao = async () => {
//   const res = await fetch("/api/auth/kakao/login", {
//     method: "GET"
//   });
//   console.log(res);
// };

// 소셜로그아웃 : 카카오톡

export async function signInWithKakao() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: "https://kwjdpavgvqhllxtfeljb.supabase.co/auth/v1/callback"
    }
  });

  console.error(error);

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}
