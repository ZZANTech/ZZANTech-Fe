"use client";

import { fetchQuizStatus } from "@/apis/quiz";
import { BASE_URL } from "@/constants";
import { User } from "@/types/user.type";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | null;
  logIn: (email: string, password: string) => void;
  hasTakenQuiz: boolean;
  setHasTakenQuiz: (value: boolean) => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  logIn: () => {},
  hasTakenQuiz: false,
  setHasTakenQuiz: () => {},
  isLoading: true
});
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasTakenQuiz, setHasTakenQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    setIsLoading(true);
    const response = await fetch(`${BASE_URL}/api/auth/me`);
    const data = await response.json();
    const users = data.users;
    if (users) {
      setUser(users);
      const quizStatus = await fetchQuizStatus();
      setHasTakenQuiz(quizStatus.hasTakenQuiz);
    } else {
      setUser(null);
      setHasTakenQuiz(false);
    }
    setIsLoading(false);
  };

  const logIn = async (email: string, password: string) => {
    setIsLoading(true);
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      await fetchUser();
    } else {
      console.log("로그인 실패");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, logIn, hasTakenQuiz, setHasTakenQuiz, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
