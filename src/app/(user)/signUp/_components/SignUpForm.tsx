"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = () => {
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [recheckPassword, setRecheckPassword] = useState("");
  const router = useRouter();

  const isDuplicate = () => {
    /**
     * 1. supabase의 회원 목록 조회 : userId
     * 2. current email과 등일한 이메일이 있는지 확인 : boolean
     */
  };

  const handleSignUp = () => {
    // supabase auth signup api
    router.replace("/login");
  };

  return (
    <div className="flex flex-col items-center w-[800px] mx-auto my-10 p-10">
      <h1 className="text-2xl text-bold">회원가입</h1>
      <form>
        <section className="flex flex-col w-[500px] gap-2.5 p-2.5 bg-white">
          <label>이메일</label>
          <div className="flex flex-row gap-2.5">
            <input
              type="email"
              value={userId}
              placeholder="이메일을 입력해주세요"
              className="w-[400px] h-[56px] p-[16px] border"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
            <button className="w-[92px] text-white bg-[#C0C0C0] text-sm">중복체크</button>
          </div>
          <p className="text-red-500 text-xs">동일한 이메일이 있습니다.</p>
        </section>

        <section className="flex flex-col w-[500px] gap-2.5 p-2.5 bg-white">
          <label>닉네임</label>
          <div className="flex flex-row gap-2.5">
            <input
              type="text"
              value={nickname}
              placeholder="닉네임을 입력해주세요"
              className="w-[400px] h-[56px] p-[16px] border"
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <button className="w-[92px] text-white bg-[#C0C0C0] text-sm">중복체크</button>
          </div>
          <p className="text-red-500 text-xs">동일한 닉네임이 있습니다.</p>
        </section>

        <section className="flex flex-col w-[500px] gap-2.5 p-2.5 bg-white">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            placeholder="비밀번호를 입력해주세요"
            className="w-100% h-[56px] p-[16px] border"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p className="text-red-500 text-xs">비밀번호는 8자 이상으로 입력해주세요</p>
        </section>

        <section className="flex flex-col w-[500px] gap-2.5 p-2.5 bg-white">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={recheckPassword}
            placeholder="비밀번호를 다시 입력해주세요"
            className="w-100% h-[56px] p-[16px] border"
            onChange={(e) => {
              setRecheckPassword(e.target.value);
            }}
          />
          <p className="text-red-500 text-xs">비밀번호가 틀립니다.</p>
        </section>
      </form>

      <div className="flex flex-col w-[500px] gap-2.5 p-2.5 items-center">
        <button className="w-[400px] p-2.5 text-center text-white bg-black" onClick={handleSignUp}>
          회원가입 완료하기
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
