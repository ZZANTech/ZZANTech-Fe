import { useMutation } from "@tanstack/react-query";
import { submitAnswer } from "@/apis/quiz";
import { TAnswerResponse, TSubmitAnswer } from "@/types/answer.type";

export const useSubmitAnswer = () => {
  return useMutation<TAnswerResponse, Error, TSubmitAnswer>({
    mutationFn: submitAnswer
  });
};
