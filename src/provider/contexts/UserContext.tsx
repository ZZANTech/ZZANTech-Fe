"use client";

import { logout } from "@/apis/auth";
import { fetchQuizStatus } from "@/apis/quiz";
import { BASE_URL } from "@/constants";
import { TUser } from "@/types/user.type";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: TUser | null;
  logIn: (email: string, password: string) => void;
  logOut: () => Promise<void>;
  hasTakenQuiz: boolean;
  setHasTakenQuiz: (value: boolean) => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  logIn: async () => {},
  logOut: async () => {},
  hasTakenQuiz: false,
  setHasTakenQuiz: () => {},
  isLoading: true
});
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
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
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        await fetchUser();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "로그인 실패");
      }
    } catch (error: any) {
      console.error(error.message);
      setIsLoading(false);
      throw error;
    }
  };
  const logOut = async () => {
    setIsLoading(true);
    await logout();
    setUser(null);
    setHasTakenQuiz(false);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, logIn, logOut, hasTakenQuiz, setHasTakenQuiz, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
