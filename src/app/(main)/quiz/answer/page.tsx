"use client";

import React from "react";
import { useRouter } from "next/navigation";
import QuizModal from "../_components/QuizModal";

const quizData = {
  explanation:
    "주택담보대출을 받을 때 변동금리와 고정금리를 선택할 수 있습니다. 변동금리는 시장 금리에 따라 이자율이 변동될 수 있으며, 고정금리는 대출 기간 동안 일정하게 유지됩니다. 대출을 받을 때 자신의 상황에 맞는 금리 방식을 선택하는 것이 중요합니다.",
  points: 5
};

function QuizAnswerPage() {
  const router = useRouter();
  const handleClose = () => {
    router.push("/");
  };

  return (
    <QuizModal>
      <div className="flex flex-col items-center">
        <p className="mb-4">정답입니다!</p>
        <p className="mb-4">해설: {quizData.explanation}</p>
        <p className="mb-4">포인트 {quizData.points}점을 획득하셨습니다!</p>
        <button onClick={handleClose} className="px-4 py-2 bg-gray-500 text-white rounded">
          확인
        </button>
      </div>
    </QuizModal>
  );
}

export default QuizAnswerPage;
