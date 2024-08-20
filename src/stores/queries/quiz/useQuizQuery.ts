import { useQuery } from "@tanstack/react-query";
import { fetchQuiz } from "@/apis/quiz";
import { TQuiz } from "@/types/quiz.type";

export const useQuiz = () => {
  return useQuery<TQuiz>({
    queryKey: ["quiz"],
    queryFn: () => fetchQuiz()
  });
};
