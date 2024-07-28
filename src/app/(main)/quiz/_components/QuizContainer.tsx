"use client";

import { useQuizStore } from "@/stores/zustand/quizStore";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/stores/queries/useQuizQuery";
import { useSubmitAnswer } from "@/stores/queries/useSubmitAnswerMutation";
import QuizAnswer from "@/app/(main)/quiz/_components/QuizAnswer";
import QuizQuestion from "@/app/(main)/quiz/_components/QuizQuestion";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

function QuizContainer() {
  const router = useRouter();
  const { data: quizData, isLoading, error } = useQuiz();
  const { mutate: submitAnswer } = useSubmitAnswer();
  const { isCorrect, explanation, showAnswer, setQuizResult, setShowAnswer } = useQuizStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAnswer = (answer: boolean) => {
    const user_id = "b3a792f6-d450-49d6-ad82-307b2dd926af";
    submitAnswer(
      { user_id, quiz_id: quizData!.quizId, answer },
      {
        onSuccess: (data) => {
          setQuizResult(data.isCorrect, quizData!.explanation);
          setShowAnswer(true);
        },
        onError: (error) => {
          alert(error.message);
        }
      }
    );
  };

  const handleClose = () => {
    setShowAnswer(false);
    router.back();
  };

  return (
    <div>
      {showAnswer ? (
        <QuizAnswer isCorrect={isCorrect} explanation={explanation} onClose={handleClose} />
      ) : (
        <QuizQuestion question={quizData!.question} onAnswer={handleAnswer} />
      )}
    </div>
  );
}

export default QuizContainer;
