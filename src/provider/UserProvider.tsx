"use client";

import { User } from "@/types/user.type";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | null;
  logIn: (email: string, password: string) => void;
};

const UserContext = createContext<UserContextType>({ user: null, logIn: () => {} });
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 유저 정보 가오기
    (async () => {
      const response = await fetch("http://localhost:3000/api/auth/me");
      const data = await response.json();
      setUser(data);
    })();
  }, []);

  const logIn = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    const logInData = data.data.user;
    setUser(logInData);
  };

  return <UserContext.Provider value={{ user, logIn }}>{children}</UserContext.Provider>;
};
export default UserProvider;
