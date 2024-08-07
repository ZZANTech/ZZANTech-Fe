"use client";

import { useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

interface SupabaseProviderProp {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProp> = ({ children }) => {
  const [supabaseClient] = useState(() => createClientComponentClient());

  // 유저 정보 가져오기
  // 로그인 함수 : signWithOAuth
  // 로그아웃 함수도?

  return <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>;
};

export default SupabaseProvider;
