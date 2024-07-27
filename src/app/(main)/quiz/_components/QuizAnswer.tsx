"use client";

import { useUserContext } from "@/provider/contexts/userContext";
import React from "react";

type QuizAnswerProps = {
  isCorrect: boolean;
  explanation: string;
  onClose: () => void;
};

function QuizAnswer({ isCorrect, explanation, onClose }: QuizAnswerProps) {
  const { setHasTakenQuiz } = useUserContext();

  const handleOnClose = () => {
    setHasTakenQuiz(true);
    onClose();
  };
  return (
    <div className="p-8 flex flex-col items-center justify-center">
      <section className="mb-5 text-center">
        <h2 className="text-2xl">{isCorrect ? "정답입니다!" : "틀렸습니다."}</h2>
      </section>
      <section className="mb-4">
        <p className="text-#535353">해설: {explanation}</p>
        <p>
          포인트 <span className="text-purple-500">{isCorrect ? 5 : 1}점</span>을 획득하셨습니다!
        </p>
      </section>
      <button onClick={handleOnClose} className="px-4 py-2 bg-gray-500 text-white rounded">
        확인
      </button>
    </div>
  );
}

export default QuizAnswer;
