"use client";

import { checkNicknameValidity } from "@/utils/authValidity";
import { createClient } from "@/utils/supabase/client";
import { MouseEventHandler, useState } from "react";

function NicknameForm({
  nickname,
  setNickname,
  setNicknameDup
}: {
  nickname: string;
  setNickname: (nickname: string) => void;
  setNicknameDup: (nicknameDup: boolean | null) => void;
}) {
  const [isCorrected, setIsCorrected] = useState<boolean | null>(null);
  const [nicknameError, setNicknameError] = useState<string>("");
  const supabase = createClient();

  const handleCheckDuplicate: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    //초기화
    setIsCorrected(null);
    setNicknameError("");
    setNicknameDup(null);

    //유효성 검사: 한글, 영어, 숫자
    checkNicknameValidity({ nickname, setNicknameError });

    //유효성 검사: 중복확인
    if (!nicknameError) {
      let { data: users, error } = await supabase.from("users").select("*").eq("nickname", nickname);
      if (users!.length > 0) {
        //users의 타입정의 필요
        setNicknameError("이미 사용 중인 닉네임입니다.");
        setIsCorrected(false);
        setNicknameDup(false);
        return;
      } else {
        setIsCorrected(true);
        setNicknameDup(true);
      }
    }
  };

  return (
    <div className="AuthInputDiv">
      <label>닉네임</label>
      <form className="AuthInputForm">
        <input
          type="text"
          value={nickname}
          maxLength={7}
          placeholder="최소 2~7자 한글, 영어, 슷자"
          className={`AuthInputShort ${nicknameError ? "border-info-red" : isCorrected ? "border-info-green" : ""}`}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button
          className={`AuthDupButton ${nickname ? "bg-black" : " bg-[#C0C0C0]"}`}
          onClick={handleCheckDuplicate}
          disabled={!nickname}
        >
          중복체크
        </button>
      </form>
      {nicknameError && <p className="AuthStateInfo">{nicknameError}</p>}
    </div>
  );
}

export default NicknameForm;
