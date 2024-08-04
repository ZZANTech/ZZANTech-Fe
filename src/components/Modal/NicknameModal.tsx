"use client";

import { updateNickname } from "@/apis/auth";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import { checkNicknameValidity } from "@/utils/authValidity";
import { useState } from "react";

function NicknameModal() {
  const { user } = useUserContext();
  const email = user?.email;
  const oldNickname = user?.nickname;

  const [nickname, setNickname] = useState<string>(oldNickname || "");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null);
  const { open } = useModal();
  const handleChangeNickname = async () => {
    // 유효성 검사: 빈칸, 글자 수, 특수문자
    setNicknameError("");
    checkNicknameValidity({ nickname, setNicknameError });

    // 중복확인 및 update API
    if (!nicknameError) {
      const res = await updateNickname(nickname, email || "", setNicknameError, setIsNicknameValid);
      if (res.ok) {
        open({
          type: "alert",
          content: "닉네임 변경이 완료되었습니다"
        });
      }
    }
  };

  return (
    <div className="relative bg-white p-10 rounded min-w-[340px] flex flex-col gap-8 items-center">
      <h2 className="px-6 py-2 text-2xl font-bold">닉네임 변경</h2>
      <input
        type="text"
        maxLength={20}
        value={nickname}
        placeholder="변경할 닉네임을 입력해주세요"
        onChange={(e) => setNickname(e.target.value)}
        className="AuthInput"
      />

      {nicknameError && <p className="AuthStateInfo">{nicknameError}</p>}

      <button
        onClick={handleChangeNickname}
        className="w-[385px] h-[52px] rounded-lg font-bold text-xl bg-black text-white"
      >
        변경하기
      </button>
    </div>
  );
}

export default NicknameModal;
