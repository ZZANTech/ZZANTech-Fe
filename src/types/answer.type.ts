import { Tables } from "@/types/supabase";

export type TAnswer = Tables<"answers">;

export type TAnswerResponse = {
  isCorrect: boolean;
  explanation: string;
};

export type TSubmitAnswer = Pick<TAnswer, "user_id" | "quiz_id" | "answer">;
