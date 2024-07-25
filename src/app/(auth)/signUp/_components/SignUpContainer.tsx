"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EmailForm from "./EmailForm";
import NicknameForm from "./NicknameForm";
import PasswordForm from "./PasswordForm";
import RecheckPasswordForm from "./RecheckPasswordForm";

function SignUpContainer() {
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [recheckPassword, setRecheckPassword] = useState<string>("");
  const router = useRouter();

  const handleClickSignup = async () => {
    const data = { email, nickname, password, recheckPassword };
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data)
    });
    const singupData = await response.json();
    console.log("handleClickSignup >> ", singupData);
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
      <button className="w-[400px] p-2.5 text-center text-white bg-black" onClick={handleClickSignup}>
        회원가입 완료하기
      </button>
    </div>
  );
}

export default SignUpContainer;
