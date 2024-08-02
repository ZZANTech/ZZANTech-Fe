"use client";

import { useQuizStore } from "@/stores/zustand/quizStore";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/stores/queries/useQuizQuery";
import { useSubmitAnswer } from "@/stores/queries/useSubmitAnswerMutation";
import QuizAnswer from "@/app/(main)/quiz/_components/QuizAnswer";
import QuizQuestion from "@/app/(main)/quiz/_components/QuizQuestion";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";

function QuizContainer() {
  const router = useRouter();
  const { data: quizData, isLoading, error } = useQuiz();
  const { mutate: submitAnswer } = useSubmitAnswer();
  const { isCorrect, explanation, showAnswer, setQuizResult, setShowAnswer } = useQuizStore();
  const { user, setHasTakenQuiz } = useUserContext();
  const modal = useModal();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleAnswer = (answer: boolean) => {
    const user_id = user ? user.userId : null;

    if (!user_id) {
      modal.open({
        type: "alert",
        content: "인증 필요",
        subContent: "퀴즈를 풀기 위해서는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?",
        onClose: () => {
          router.push("/login");
          modal.close();
        }
      });
      return;
    }

    submitAnswer(
      { user_id, quiz_id: quizData!.quizId, answer },
      {
        onSuccess: (data) => {
          setQuizResult(data.isCorrect, quizData!.explanation);
          setShowAnswer(true);
          setHasTakenQuiz(true);
        },
        onError: (error) => {
          modal.open({
            type: "alert",
            content: "오류 발생",
            subContent: error.message,
            onClose: () => {
              modal.close();
            }
          });
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
