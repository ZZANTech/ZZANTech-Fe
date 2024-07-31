"use client";

import { updateNickname } from "@/apis/auth";
import { checkNicknameValidity } from "@/app/(auth)/authValidity";

import { BASE_URL } from "@/constants";
import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function InfoContainer() {
  const { user } = useUserContext();
  const userId = user?.userId;
  const oldNickname = user?.nickname;

  const [isClicked, setIsClicked] = useState<Boolean>(false);
  const [nickname, setNickname] = useState<string>(oldNickname || "");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);

  const handleNicknameChange = async () => {
    // 유효성 검사: 빈칸, 글자 수, 특수문자
    checkNicknameValidity({ nickname, setNicknameError });

    // 중복확인 및 update API
    if (!nicknameError) {
      await updateNickname(nickname, userId || "", setNicknameError, setIsNicknameValid);
    }

    if (!isNicknameValid) {
      setNickname(oldNickname || "");
      setIsClicked(false);
      // setNicknameError("");
    }

    setIsClicked(false);
    setNicknameError("");
  };

  return (
    <div className="flex flex-row justify-between">
      <div>
        <div className="flex flex-row gap-2.5">
          <Image src={user?.badge_url || ""} width={24} height={24} alt="mainLogo" />
          {isClicked ? (
            <>
              <input
                type="text"
                maxLength={20}
                value={nickname}
                placeholder="변경할 닉네임을 입력해주세요"
                onChange={(e) => setNickname(e.target.value)}
              />
              <button className="bg-gray-300 rounded-sm text-[11px] w-[20px] h-[15px]" onClick={handleNicknameChange}>
                수정
              </button>
              <button
                className="bg-gray-300 rounded-sm text-[11px] w-[20px] h-[15px]"
                onClick={() => setIsClicked(false)}
              >
                취소
              </button>
            </>
          ) : (
            <>
              <p>{user?.nickname}님</p>
              <button
                className="bg-gray-300 rounded-sm text-[11px] w-[20px] h-[15px]"
                onClick={() => setIsClicked(true)}
              >
                수정
              </button>
            </>
          )}

          {nicknameError && <p className="AuthStateInfo">{nicknameError}</p>}
        </div>
        <div className="flex flex-row gap-2.5">
          <p>이메일 주소</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <Link href={`${BASE_URL}/mypage/edit`} className="bg-black text-white rounded-lg">
        회원 정보 변경
      </Link>
    </div>
  );
}

export default InfoContainer;
