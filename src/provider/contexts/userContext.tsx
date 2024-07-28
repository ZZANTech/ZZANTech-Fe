"use client";

import { BASE_URL } from "@/constants";
import { User } from "@/types/user.type";
import { createContext, useContext, useEffect, useState } from "react";
// 제발바껴줘
type UserContextType = {
  user: User | null;
  logIn: (email: string, password: string) => void;
};

const UserContext = createContext<UserContextType>({ user: null, logIn: () => {} });
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const response = await fetch(`${BASE_URL}/api/auth/me`);
    const data = await response.json();
    const users = data.users;
    if (users) {
      setUser(users);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logIn = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      console.log("로그인 실패");
    }
    await getUser();
  };

  return <UserContext.Provider value={{ user, logIn }}>{children}</UserContext.Provider>;
};
export default UserProvider;
