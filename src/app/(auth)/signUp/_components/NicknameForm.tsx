"use client";

import { checkDuplicationNickname } from "@/apis/auth";
import Button from "@/components/Button";
import { useModal } from "@/provider/contexts/ModalContext";
import { checkNicknameValidity } from "@/utils/authValidity";
import { useState } from "react";

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
  const modal = useModal();

  const handleCheckDuplicate: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    //초기화
    setIsCorrected(null);
    setNicknameError("");
    setNicknameDup(null);

    //유효성 검사: 한글, 영어, 숫자
    // checkNicknameValidity({ nickname, setNicknameError });

    //유효성 검사: 중복확인
    if (nicknameError) {
      console.log("nicknameError", nicknameError);
      return;
    }

    if (!nicknameError) {
      try {
        checkDuplicationNickname({ nickname, setNicknameError, setIsCorrected });
        setNicknameDup(isCorrected);
      } catch (error) {
        console.log("error", error);
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
          onChange={(e) => {
            setNickname(e.target.value);
            checkNicknameValidity({ nickname, setNicknameError });
          }}
        />
        <Button size={"small"} disabled={nicknameError.length > 1 || nickname === ""} onClick={handleCheckDuplicate}>
          중복체크
        </Button>
      </form>
      <p className="text-info-red text-xs">{nicknameError}</p>
      <p className="text-info-green text-xs">{nicknameError ? "" : isCorrected ? "사용 가능합니다" : ""}</p>
    </div>
  );
}

export default NicknameForm;
