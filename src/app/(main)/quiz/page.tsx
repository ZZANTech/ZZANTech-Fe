"use client";

import React from "react";
import { useRouter } from "next/navigation";
import QuizModal from "./_components/QuizModal";

const quizData = {
  question:
    "주택담보대출을 받을 때, 대출 금리는 변동금리와 고정금리 중에서 선택할 수 있습니다. 변동금리는 시장 금리에 따라 달라질 수 있으며, 고정금리는 대출 기간 동안 일정하게 유지됩니다. 각각의 금리는 이자율과 상환 방식에서 차이가 있습니다.",
  correctAnswer: true,
  explanation:
    "주택담보대출을 받을 때 변동금리와 고정금리를 선택할 수 있습니다. 변동금리는 시장 금리에 따라 이자율이 변동될 수 있으며, 고정금리는 대출 기간 동안 일정하게 유지됩니다. 대출을 받을 때 자신의 상황에 맞는 금리 방식을 선택하는 것이 중요합니다."
};

function QuizPage() {
  const router = useRouter();
  const handleAnswer = (answer: boolean) => {
    if (answer === quizData.correctAnswer) {
      router.push("/quiz/answer");
    } else {
      router.push("/quiz/answer");
    }
  };

  return (
    <QuizModal>
      zz
      <strong className="text-lg font-semibold mb-4 block">오늘의 퀴즈</strong>
      <p className="mb-4">{quizData.question}</p>
      <div className="flex justify-center">
        <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleAnswer(true)}>
          O
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => handleAnswer(false)}>
          X
        </button>
      </div>
    </QuizModal>
  );
}

export default QuizPage;
