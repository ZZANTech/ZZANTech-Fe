"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log("email / password >>", email, password);
    router.replace("/");
  };

  return (
    <div className="flex flex-col items-center w-[800px] mx-auto my-10 p-10">
      <Link href="/">짠테크 로고</Link>
      <form>
        <div className="flex flex-col w-[500px] gap-2.5 p-2.5 bg-white">
          <label>이메일</label>
          <input
            type="text"
            value={email}
            placeholder="이메일을 입력해주세요"
            className="w-[436px] h-[56px] p-[16px] border"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p className="text-red-500 text-xs">아이디가 옳지 않습니다.</p>
        </div>

        <div className="flex flex-col w-[500px] gap-2.5 p-2.5 bg-white">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            placeholder="비밀번호를 입력해주세요"
            className="w-[436px] h-[56px] p-[16px] border"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p className="text-red-500 text-xs">비밀번호가 옳지 않습니다.</p>
        </div>
      </form>

      <div className="flex flex-col w-[500px] gap-2.5 p-2.5 items-center">
        <button className="w-[400px] p-2.5 text-center text-white bg-black" onClick={handleLogin}>
          로그인
        </button>
        <Link href="/signIn" className="w-[400px] p-2.5 text-center text-white bg-yellow-500">
          카카오로 계속하기
        </Link>
        <Link href="/signIn" className="w-[400px] p-2.5 text-center text-white bg-blue-500">
          Google로 계속하기
        </Link>
        <div className="flex flex-row gap-2.5">
          <p>아직 회원이 아니신가요?</p>
          <Link href="/signUp" className="text-blue-500">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
