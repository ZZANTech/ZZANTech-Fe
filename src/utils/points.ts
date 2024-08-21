import { checkAndAddPoints } from "@/utils/checkPoints";

export const POINTS = {
  KNOWHOW_POST: 100,
  QUIZ_CORRECT: 50,
  QUIZ_PARTICIPATION: 10,
  VOTE_LIKE: 10
};

export const REASONS = {
  KNOWHOW_POST: "짠 노하우 게시글 작성",
  QUIZ_CORRECT: "퀴즈 정답",
  QUIZ_PARTICIPATION: "퀴즈 참여",
  VOTE_LIKE: "따봉"
};
export const MAX_POINTS_PER_DAY = 1000;

export async function addPoints(userId: string, points: number, reason: string) {
  try {
    await checkAndAddPoints(userId, points, reason);
  } catch (error: any) {
    console.error(`포인트 추가 도중 오류 발생: ${error.message}`);
  }
}
