import { Dispatch, SetStateAction } from "react";

export const logout = async () => {
  const res = await fetch("/api/auth/login", { method: "DELETE" });
  console.log("authentication >>", res);
};

export const updateNickname = async (
  nickname: string,
  userId: string | undefined,
  setNicknameDupError: Dispatch<SetStateAction<string>>,
  setIsNicknameAllPassed: Dispatch<SetStateAction<boolean>>
) => {
  const res = await fetch("/api/auth/mypage/nickname", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nickname, userId })
  });

  console.log("updateNickname >>", res);
  if (res.status === 409) {
    setNicknameDupError("동일한 닉네임이 있습니다.");
    setIsNicknameAllPassed(false);
  }
  if (res.status === 500) {
    setNicknameDupError("알 수 없는 에러가 발생 했습니다.");
    setIsNicknameAllPassed(false);
  }
  if (res.status === 200) {
    setNicknameDupError("닉네임 변경 완료");
    setIsNicknameAllPassed(true);
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
