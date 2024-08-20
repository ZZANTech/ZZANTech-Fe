"use client";

import { logout } from "@/apis/auth";
import { fetchQuizStatus } from "@/apis/quiz";
import { BASE_URL } from "@/constants";
import useUserQuery from "@/stores/queries/auth/useUserQuery";
import { TUser } from "@/types/user.type";
import { revalidateRoute } from "@/utils/revalidation";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: TUser | null;
  logIn: (email: string, password: string) => void;
  logOut: () => Promise<void>;
  hasTakenQuiz: boolean;
  setHasTakenQuiz: (value: boolean) => void;
  isPending: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  logIn: async () => {},
  logOut: async () => {},
  hasTakenQuiz: false,
  setHasTakenQuiz: () => {},
  isPending: true
});
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { data: user = null, isPending, refetch } = useUserQuery();
  const [hasTakenQuiz, setHasTakenQuiz] = useState(false);

  const logIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        refetch();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "로그인 실패");
      }
    } catch (error) {
      // console.error(error.message);
      throw error;
    }
  };

  const logOut = async () => {
    await logout();
    revalidateRoute("/", "layout");

    queryClient.invalidateQueries({ queryKey: ["user"] });
    setHasTakenQuiz(false);
  };

  useEffect(() => {
    const checkQuizStatus = async () => {
      if (user) {
        const quizStatus = await fetchQuizStatus();
        setHasTakenQuiz(quizStatus.hasTakenQuiz);
      } else {
        setHasTakenQuiz(false);
      }
    };

    checkQuizStatus();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, logIn, logOut, hasTakenQuiz, setHasTakenQuiz, isPending }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
