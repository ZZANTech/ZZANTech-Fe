"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

function NicknameForm({ nickname, setNickname }) {
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [isCorrected, setIsCorrected] = useState(false);
  const supabase = createClient();

  const isDuplicate = async (e) => {
    e.preventDefault();
    let { data: users, error } = await supabase.from("users").select("*").eq("nickname", nickname);
    if (users.length > 0) {
      setIsDuplicated(true);
      setIsCorrected(false);
    } else {
      setIsDuplicated(false);
      setIsCorrected(true);
    }
  };

  return (
    <div className="flex flex-col w-[500px] gap-2.5 p-2.5 bg-white">
      <label>닉네임</label>
      <form className="flex flex-row gap-2.5">
        <input
          type="text"
          value={nickname}
          placeholder="닉네임을 입력해주세요"
          className="w-[400px] h-[56px] p-[16px] border"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <button className="w-[92px] text-white bg-[#C0C0C0] text-sm" onClick={isDuplicate}>
          중복체크
        </button>
      </form>
      {isDuplicated ? <p className="text-red-500 text-xs">동일한 닉네임이 있습니다.</p> : ""}
      {isCorrected ? <p className="text-green-500 text-xs">사용 가능한 닉네임입니다.</p> : ""}
    </div>
  );
}

export default NicknameForm;
