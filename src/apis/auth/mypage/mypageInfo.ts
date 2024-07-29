import { BASE_URL } from "@/constants";

// export const checkNicknameAvailability = async (nickname: string): Promise<boolean> => {
//   const response = await fetch(`${BASE_URL}/api/auth/mypage/test`, {
//     method: "GET",
//     // headers: {
//     //   "Content-Type": "application/json"
//     // },
//     // body: JSON.stringify({ type: "checkNickname", nickname })
//     body: JSON.stringify({ nickname })
//   });
//   const data = await response.json();
//   return response.ok;
// };

export const checkNicknameAvailability = async (nickname: string) => {
  const response = await fetch(`${BASE_URL}/api/auth/mypage/test`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json"
    // },
    // body: JSON.stringify({ type: "checkNickname", nickname })
    body: JSON.stringify({ nickname })
  });

  const data = await response.json();
  return data;
};

export const updateNickname = async (userId: string, nickname: string) => {
  const response = await fetch("/api/auth/mypage/info", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ type: "changeNickname", userId, nickname })
    // body가 어떻게 보이는지 확인해봐야겠군..
  });

  console.log("updateNickname response >>", response);
  // request(요청)가 정상적으로 성공하면 response.ok가 true (false는 실패)
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
};

export const updatePassword = async (userId: string, oldPassword: string, newPassword: string) => {
  const response = await fetch("/api/auth/mypage/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ type: "changePassword", userId, oldPassword, newPassword })
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
};
