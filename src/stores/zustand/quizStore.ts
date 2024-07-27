import { create } from "zustand";

interface QuizState {
  isCorrect: boolean;
  explanation: string;
  showAnswer: boolean;
  setQuizResult: (isCorrect: boolean, explanation: string) => void;
  setShowAnswer: (show: boolean) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  isCorrect: false,
  explanation: "",
  showAnswer: false,
  setQuizResult: (isCorrect, explanation) => set({ isCorrect, explanation }),
  setShowAnswer: (show) => set({ showAnswer: show })
}));
