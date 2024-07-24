import { BASE_URL } from "@/constants";
import { Answer } from "@/types/answer.type";
import { TQuiz } from "@/types/quiz.type";

type SubmitAnswer = Pick<Answer, "user_id" | "quiz_id" | "answer">;

export const fetchQuiz = async (): Promise<TQuiz> => {
  const response = await fetch(`${BASE_URL}/api/quiz`);
  if (!response.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
  return response.json();
};

export const submitAnswer = async ({ user_id, quiz_id, answer }: SubmitAnswer) => {
  const response = await fetch(`${BASE_URL}/api/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_id, quiz_id, answer })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "에러가 발생했습니다.");
  }

  return response.json();
};
