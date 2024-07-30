"use client";

import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import { useEffect, useState } from "react";

type QuizAnswerProps = {
  isCorrect: boolean;
  explanation: string;
  onClose: () => void;
};

function QuizAnswer({ isCorrect, explanation, onClose }: QuizAnswerProps) {
  const { setHasTakenQuiz } = useUserContext();
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleOnClose = () => {
    setHasTakenQuiz(true);
    onClose();
  };
  return (
    <div className="p-8 flex flex-col items-center justify-center relative w-full h-full min-h-[500px] min-w-[500px]">
      {showAnimation ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={isCorrect ? "/icons/quiz/animations_confetti.gif" : "/icons/quiz/animations_state_x.png"}
            alt={isCorrect ? "correct answer animation" : "incorrect answer animation"}
            width={isCorrect ? 500 : 300}
            height={isCorrect ? 500 : 300}
            className={`${!isCorrect && "animate-bounce"} object-cover`}
            unoptimized
          />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default QuizAnswer;
