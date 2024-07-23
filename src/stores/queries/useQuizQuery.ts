import { useQuery } from "@tanstack/react-query";
import { fetchQuiz } from "@/apis/quiz";

export const useQuiz = () => {
  return useQuery({
    queryKey: ["quiz"],
    queryFn: () => fetchQuiz()
  });
};
