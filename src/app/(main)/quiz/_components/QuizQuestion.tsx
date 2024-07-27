"use client";

import { useUserContext } from "@/provider/contexts/userContext";
import React from "react";

type QuizQuestionProps = {
  question: string;
  onAnswer: (answer: boolean) => void;
};

function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  const { setHasTakenQuiz } = useUserContext();

  const handleAnswer = (answer: boolean) => {
    setHasTakenQuiz(true);
    onAnswer(answer);
  };
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <strong className="text-lg font-semibold mb-4 block">오늘의 퀴즈</strong>
      <p className="mb-4">{question}</p>
      <div className="flex justify-center">
        <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleAnswer(true)}>
          O
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => handleAnswer(false)}>
          X
        </button>
      </div>
    </div>
  );
}

export default QuizQuestion;
