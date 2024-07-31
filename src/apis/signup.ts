import { BASE_URL } from "@/constants";
import { TUserInsert } from "@/types/user.type";

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
