import { Dispatch, SetStateAction } from "react";

export const updateNickname = async (
  nickname: string,
  setNicknameDupError: Dispatch<SetStateAction<string>>,
  setIsNicknameAllPassed: Dispatch<SetStateAction<boolean>>
) => {
  const res = await fetch("/api/auth/mypage/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nickname)
  });

  // console.log("updateNickname >> ", res);

  if (res.status === 200) {
    setNicknameDupError("사용 가능한 닉네임 입니다");
    setIsNicknameAllPassed(true);
  }

  if (res.status === 409) {
    setNicknameDupError("동일한 닉네임이 있습니다.");
    setIsNicknameAllPassed(false);
  }

  if (res.status === 500) {
    setNicknameDupError("알 수 없는 에러가 발생했습니다.");
    setIsNicknameAllPassed(false);
  }
};

// export const updatePassword = async (userId: string, oldPassword: string, newPassword: string) => {
//   const response = await fetch("/api/auth/mypage/info", {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ type: "changePassword", userId, oldPassword, newPassword })
//   });
//   if (!response.ok) {
//     const data = await response.json();
//     throw new Error(data.error);
//   }
// };

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
    console.log("resetPassword >> ", result);
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
    console.log("resetPassword >> ", result);
  }
};
