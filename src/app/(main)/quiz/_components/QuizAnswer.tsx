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
    <div className="p-8 flex flex-col justify-between relative w-full h-full min-h-[500px] min-w-[500px]">
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
        <div>
          <section className="mb-5 text-center">
            <Image
              src={isCorrect ? "/icons/quiz/state-o.png" : "/icons/quiz/state-x.png"}
              alt={isCorrect ? "정답입니다!" : "틀렸습니다."}
              width={isCorrect ? 200 : 200}
              height={isCorrect ? 200 : 200}
              className="mx-auto"
            />
          </section>
          <section className="mb-4 text-center">
            <div className="text-4xl mb-4 font-bold">
              포인트 <span className="text-purple-500">{isCorrect ? 5 : 1}점</span>을 획득하셨습니다!
            </div>
            <div className={`text-4xl mb-4 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
              {isCorrect ? "O" : "X"}
            </div>
            <p className="text-#535353">해설: {explanation}</p>
          </section>
          <button onClick={handleOnClose} className="px-4 py-2 bg-gray-500 text-white rounded-full">
            확인
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizAnswer;
