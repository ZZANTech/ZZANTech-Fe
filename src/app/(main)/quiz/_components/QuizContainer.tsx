"use client";

import QuizAnswer from "@/app/(main)/quiz/_components/QuizAnswer";
import QuizQuestion from "@/app/(main)/quiz/_components/QuizQuestion";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import { useQuiz } from "@/stores/queries/quiz/useQuizQuery";
import { useSubmitAnswer } from "@/stores/queries/quiz/useSubmitAnswerMutation";
import { useQuizStore } from "@/stores/zustand/quizStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import FlyingTikkle from "@/components/Loading/FlyingTikkle";

function QuizContainer() {
  const router = useRouter();
  const { data: quizData, isPending, error } = useQuiz();
  const { mutate: submitAnswer } = useSubmitAnswer();
  const { isCorrect, explanation, showAnswer, setQuizResult, setShowAnswer } = useQuizStore();
  const { user, setHasTakenQuiz } = useUserContext();
  const modal = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isPending) {
    return <FlyingTikkle isSubmitting />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleAnswer = (answer: boolean) => {
    if (isSubmitting) return;

    if (!user) {
      modal.open({
        type: "alert",
        content: "로그인 필요",
        subContent: "퀴즈를 풀기 위해서는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?",
        onClose: () => {
          modal.close();
          router.push("/login");
        }
      });
      return;
    }
    setIsSubmitting(true);
    submitAnswer(
      { user_id: user.userId, quiz_id: quizData!.quizId, answer },
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
        },
        onSettled: () => {
          setIsSubmitting(false);
        }
      }
    );
  };

  const handleClose = () => {
    setShowAnswer(false);
    router.back();
  };

  return (
    <div className="relative lg:px-4 lg:py-6 flex flex-col justify-start w-full h-full">
      {/* 작은 화면에서만 보이는 뒤로가기 버튼과 "오늘의 퀴즈" */}
      {!isSubmitting && (
        <div className="lg:hidden flex items-center justify-between mt-8">
          <button onClick={handleClose}>
            <Image src="/icons/quiz/back.svg" alt="뒤로가기" width={24} height={24} className="ml-5" />
          </button>
          <h3 className="text-lg font-bold flex-grow text-center pr-12">오늘의 퀴즈</h3>
        </div>
      )}
      {isSubmitting && <Image src="/home/loading.svg" alt="loading" width={100} height={100} className="m-auto" />}
      {!isSubmitting &&
        (showAnswer ? (
          <QuizAnswer isCorrect={isCorrect} explanation={explanation} onClose={handleClose} />
        ) : (
          <QuizQuestion question={quizData!.question} onAnswer={handleAnswer} />
        ))}
    </div>
  );
}

export default QuizContainer;
