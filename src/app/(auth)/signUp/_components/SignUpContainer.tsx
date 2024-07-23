"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EmailForm from "./EmailForm";
import NicknameForm from "./NicknameForm";
import PasswordForm from "./PasswordForm";
import RecheckPasswordForm from "./RecheckPasswordForm";
import { User } from "@supabase/supabase-js";

function SignUpContainer() {
  const [user, setUser] = useState<User | null>({});
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [recheckPassword, setRecheckPassword] = useState<string>("");
  const router = useRouter();

  const handleClickSignup = async () => {
    const currentUserData = { email, nickname, password, recheckPassword };
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(currentUserData)
    });
    const data = await response.json();
    console.log("handleClickSignup >> ", data);
    router.replace("/login");
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/me").then(async (response) => {
      if (response.status === 200) {
        const {
          data: { user }
        } = await response.json();
        setUser(user);
        console.log("user", user);
      }
    });
  }, []);

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
      <button className="w-[400px] p-2.5 text-center text-white bg-black" onClick={handleClickSignup}>
        회원가입 완료하기
      </button>
    </div>
  );
}

export default SignUpContainer;
