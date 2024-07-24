import { useMutation } from "@tanstack/react-query";
import { submitAnswer } from "@/apis/quiz";

export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: submitAnswer
  });
};
