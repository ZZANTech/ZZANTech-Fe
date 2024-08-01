"use client";

import { BASE_URL } from "@/constants";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";

function InfoContainer() {
  const { user } = useUserContext();

  const modal = useModal();
  const handleOpenModal = () => {
    modal.open({
      type: "nickname"
    });
  };

  return (
    <div className="mb-6 p-6 bg-gray-100 rounded-3xl flex justify-between">
      <div className="flex flex-col">
        <div className="mb-2 flex gap-[18px] items-center">
          <Image src={user?.badge_url || ""} width={36} height={36} alt="badge_url" />
          <p className="text-xl font-semibold">{user?.nickname} 님</p>
          <button className="" onClick={handleOpenModal}>
            수정
          </button>
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
