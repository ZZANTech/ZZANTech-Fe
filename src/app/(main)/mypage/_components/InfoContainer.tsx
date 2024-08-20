"use client";

import Button from "@/components/Button/Button";
import { BASE_URL } from "@/constants";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";

function InfoContainer() {
  const { user } = useUserContext();

  const modal = useModal();
  const handleOpenModal = () => {
    modal.open({
      type: "nickname"
    });
  };

  return (
    <div className="mb-6 py-6 px-3 lg:px-6 bg-[#f6f5f1] rounded-2xl flex flex-col lg:flex-row lg:justify-between">
      <>
        <div className="flex flex-col">
          <div className="mb-2 flex items-center">
            <div className="w-11 mr-4">
              <Image src={user?.badge_url || ""} width={36} height={36} alt="badge_url" />
            </div>
            <p className="text-xl font-semibold">{user?.nickname} 님</p>
            <Image
              className="cursor-pointer ml-2"
              src={"/icons/mypage/pencil_white.png"}
              width={24}
              height={24}
              alt="pencil"
              onClick={handleOpenModal}
            />
          </div>
          <div className="flex text-[#6c6c6c]">
            <p className="w-11 mr-4">이메일</p>
            <p>{user?.email}</p>
          </div>
        </div>
      </>
      <div className="flex flex-row-reverse mt-3 lg:mt-0">
        <Button href={`${BASE_URL}/mypage/edit`} textSize={"small"} weight={"semibold"}>
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
}

export default InfoContainer;
