"use client";

import { updateNickname } from "@/apis/auth";
import { BASE_URL } from "@/constants";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import { checkNicknameValidity } from "@/utils/authValidity";
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

  const modal = useModal();

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
    <div className="mb-6 p-6 bg-gray-100 rounded-3xl flex justify-between">
      <div className="flex flex-col">
        <div className="mb-2 flex gap-[18px] items-center">
          <Image src={user?.badge_url || ""} width={36} height={36} alt="badge_url" />
          {isClicked ? (
            <>
              <input
                type="text"
                maxLength={20}
                value={nickname}
                placeholder="변경할 닉네임을 입력해주세요"
                onChange={(e) => setNickname(e.target.value)}
              />
              <button className="" onClick={handleNicknameChange}>
                수정
              </button>
              {/* <button
                className=""
                onClick={() => setIsClicked(false)}
              >
                취소
              </button> */}
            </>
          ) : (
            <>
              <p className="text-xl font-semibold">{user?.nickname} 님</p>
              <button className="" onClick={() => setIsClicked(true)}>
                수정
              </button>
            </>
          )}

          {nicknameError && <p className="">{nicknameError}</p>}
        </div>
        <div className="flex gap-[18pt]">
          <p>이메일</p>
          <p>{user?.email}</p>
        </div>
      </div>

      <Link href={`${BASE_URL}/mypage/edit`} className="">
        비밀번호 변경
      </Link>
    </div>
  );
}

export default InfoContainer;
