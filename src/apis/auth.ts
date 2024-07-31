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
  setNicknameDupError: Dispatch<SetStateAction<string>>,
  setIsNicknameAllPassed: Dispatch<SetStateAction<boolean>>
) => {
  const res = await fetch("/api/auth/mypage/test", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nickname)
  });

  if (res.status === 409) {
    setNicknameDupError("동일한 닉네임이 있습니다.");
    setIsNicknameAllPassed(false);
  }
  if (res.status === 500) {
    setNicknameDupError("알 수 없는 에러가 발생했습니다.");
    setIsNicknameAllPassed(false);
  }
  if (res.status === 200) {
    setNicknameDupError("사용 가능한 닉네임 입니다");
    setIsNicknameAllPassed(true);
  }

  const res2 = await fetch("/api/auth/mypage/test", {});
  // console.log("updateNickname >> ", res);
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

export const updatePassword = async (password: string) => {
  const res = await fetch("/api/auth/mypage/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(password)
  });

  const result = await res.json();
  if (res.ok) {
    // console.log("resetPassword >> ", result);
  }
};
