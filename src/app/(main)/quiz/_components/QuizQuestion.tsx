"use client";

import Image from "next/image";
import React, { useState } from "react";

type QuizQuestionProps = {
  question: string;
  onAnswer: (answer: boolean) => void;
};

function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleAnswer = (answer: boolean) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    onAnswer(answer);
  };
  return (
    <div className="flex flex-col items-center justify-between p-10  max-w-screen-sm mx-auto">
      <Image src="/icons/quiz/quizTitle.png" width={400} height={150} alt="Quiz Title" className="mb-10" />
      <p className="mb-4 p-3 text-xl">{question}</p>
      <div className="flex justify-center gap-10 w-full">
        <button
          className="group flex justify-center items-center w-[100px] h-20 px-5 py-2 gap-2 rounded-[12px] bg-gray-50 shadow-md transition duration-300 ease-out hover:bg-gray-200"
          onClick={() => handleAnswer(true)}
          disabled={isSubmitting}
        >
          <span className="text-gray-400 text-[60px] font-bold pt-2 group-hover:text-[#58D556]">O</span>
        </button>
        <button
          className="group flex justify-center items-center w-[100px] h-20 px-5 gap-2 rounded-[12px] bg-gray-50 shadow-md transition duration-300 ease-out hover:bg-gray-200"
          onClick={() => handleAnswer(false)}
          disabled={isSubmitting}
        >
          <span className="text-gray-400 text-[60px] font-bold pt-2 group-hover:text-[#F47C7C]">X</span>
        </button>
      </div>
    </div>
  );
}

export default QuizQuestion;
