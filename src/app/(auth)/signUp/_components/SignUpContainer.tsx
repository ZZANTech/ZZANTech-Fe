"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EmailForm from "./EmailForm";
import NicknameForm from "./NicknameForm";
import PasswordForm from "./PasswordForm";
import RecheckPasswordForm from "./RecheckPasswordForm";

function SignUpContainer() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [recheckPassword, setRecheckPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) {
      console.log("authError >>", error);
    }
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        userId: data.user?.id,
        email,
        nickname: nickname,
        created_at: data.user?.created_at,
        provider: "email",
        total_point: 0,
        current_point: 0,
        updated_at: null
      })
      .select();
    if (error) {
      console.log("usersError >> ", userError);
    }
    router.replace("/login");
  };

  return (
    <div className="flex flex-col items-center w-[800px] mx-auto my-10 p-10">
      <h1 className="text-2xl text-bold">회원가입</h1>
      <section>
        <EmailForm email={email} setEmail={setEmail} />
        <NicknameForm nickname={nickname} setNickname={setNickname} />
        <PasswordForm password={password} setPassword={setPassword} />
        <RecheckPasswordForm
          recheckPassword={recheckPassword}
          setRecheckPassword={setRecheckPassword}
          password={password}
        />
      </section>
      <button className="w-[400px] p-2.5 text-center text-white bg-black" onClick={handleSignUp}>
        회원가입 완료하기
      </button>
    </div>
  );
}

export default SignUpContainer;
