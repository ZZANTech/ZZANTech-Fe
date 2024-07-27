export const checkNicknameAvailability = async (nickname: string): Promise<boolean> => {
  const response = await fetch("/api/auth/mypage/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ type: "checkNickname", nickname })
  });
  const data = await response.json();
  return response.ok;
};

export const updateNickname = async (userId: string, nickname: string) => {
  const response = await fetch("/api/auth/mypage/info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ type: "changeNickname", userId, nickname })
  });
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
