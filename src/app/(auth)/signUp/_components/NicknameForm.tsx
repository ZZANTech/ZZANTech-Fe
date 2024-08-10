"use client";

import Button from "@/components/Button";
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

  const handleCheckDuplicate: React.MouseEventHandler<HTMLButtonElement> = async () => {
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
    <div className="flex flex-col">
      <label>닉네임</label>
      <form className="flex flex-row gap-2.5">
        <input
          type="text"
          value={nickname}
          maxLength={7}
          placeholder="최소 2~7자 한글, 영어, 슷자"
          className={`auth-input-short ${nicknameError ? "border-info-red" : isCorrected ? "border-info-green" : ""}`}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Button size={"small"} disabled={!nickname} onClick={() => handleCheckDuplicate}>
          중복체크
        </Button>
      </form>
      {nicknameError && <p className="text-info-red text-xs">{nicknameError}</p>}
    </div>
  );
}

export default NicknameForm;
