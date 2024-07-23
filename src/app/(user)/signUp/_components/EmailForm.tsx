"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

function EmailForm({ email, setEmail }) {
  const [isduplicated, setIsduplicated] = useState(false);
  const supabase = createClient();

  const isDuplicate = async (e) => {
    e.preventDefault();
    let { data: users, error } = await supabase.from("users").select("*").eq("email", email);
    if (users.length > 0) {
      setIsduplicated(true);
    } else {
      setIsduplicated(false);
    }
  };

  return (
    <div className="flex flex-col w-[500px] gap-2.5 p-2.5 bg-white">
      <label>이메일</label>
      <form className="flex flex-row gap-2.5">
        <input
          type="email"
          value={email}
          placeholder="이메일을 입력해주세요"
          className="w-[400px] h-[56px] p-[16px] border"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button className="w-[92px] text-white bg-[#C0C0C0] text-sm" onClick={isDuplicate}>
          중복체크
        </button>
      </form>
      {isduplicated ? <p className="text-red-500 text-xs">동일한 이메일이 있습니다.</p> : ""}
    </div>
  );
}

export default EmailForm;
