"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
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
    <div className="flex flex-col items-center justify-between px-10 py-5 space-y-9">
      <Image src="/icons/quiz/quizTitle.png" width={200} height={200} alt="Quiz Title" />
      <p className="mb-4 p-3 text-xl">{question}</p>
      <div className="flex justify-center gap-10">
        <button
          className="group flex justify-center items-center max-w-[100px] max-h-[80px] px-5 py-2 gap-2 rounded-[12px] bg-gray-50 shadow-md transition duration-300 ease-out hover:bg-gray-200"
          onClick={() => handleAnswer(true)}
        >
          <span className="text-gray-400 text-[60px] font-bold leading-[75px] tracking-[-1.2px] group-hover:text-[#58D556]">
            O
          </span>
        </button>
        <button
          className="group flex justify-center items-center max-w-[100px] max-h-[80px] px-5 py-2 gap-2 rounded-[12px] bg-gray-50 shadow-md transition duration-300 ease-out hover:bg-gray-200"
          onClick={() => handleAnswer(false)}
        >
          <span className="text-gray-400 text-[60px] font-bold leading-[75px] tracking-[-1.2px] group-hover:text-[#F47C7C]">
            X
          </span>
        </button>
      </div>
    </div>
  );
}

export default QuizQuestion;
