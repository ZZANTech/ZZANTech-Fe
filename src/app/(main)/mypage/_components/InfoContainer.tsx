"use client";

import Button from "@/components/Button/Button";
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
    <div className="mb-6 p-6 bg-[#f6f5f1] rounded-2xl flex justify-between">
      <div className="flex flex-col w-[241px]">
        <div className="mb-2 flex  items-center">
          <Image src={user?.badge_url || ""} width={36} height={36} alt="badge_url" />
          <p className="text-xl ml-[18px] font-semibold">{user?.nickname} 님</p>
          <Image
            className="cursor-pointer ml-[12px]"
            src={"/icons/mypage/pencil_white.png"}
            width={24}
            height={24}
            alt="pencil"
            onClick={handleOpenModal}
          />
        </div>
        <div className="flex gap-[18pt] text-[#6c6c6c]">
          <p>이메일</p>
          <p>{user?.email}</p>
        </div>
      </div>

      <Link
        href={`${BASE_URL}/mypage/edit`}
        className="flex items-center w-[112px] h-10 px-4 py-3.5 text-sm font-semibold bg-black text-white rounded-md"
      >
        비밀 번호 변경
      </Link>
    </div>
  );
}

export default InfoContainer;
