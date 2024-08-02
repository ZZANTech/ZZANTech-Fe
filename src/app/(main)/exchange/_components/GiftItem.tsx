"use client";
import Button from "@/components/Button/Button";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import useExchangeMutation from "@/stores/queries/useExchangeMutation";
import { Tables } from "@/types/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";

type GiftItemProps = {
  gift: Tables<"gifts">;
};

function GiftItem({ gift }: GiftItemProps) {
  const { user } = useUserContext();
  const { open } = useModal();
  const { addClaim } = useExchangeMutation();
  const router = useRouter();
  const handleExchange = async () => {
    const newExchange = {
      gift_id: gift.giftId,
      user_id: user?.userId
    };
    await addClaim(newExchange);
  };
  const handleOpenConfirmModal = () => {
    if (!user) {
      open({
        type: "alert",
        content: "로그인이 필요한 서비스에요",
        buttonContent: "로그인하기",
        onClose: () => router.push("/login")
      });
      return;
    }

    open({
      type: "confirm",
      content: "가입하신 이메일 주소로 발송됩니다",
      subContent: "정말 교환하시겠습니까?",
      buttonContent: "교환하기",
      onConfirm: handleExchange
    });
  };

  const userCurrentPoints = user?.current_point ?? 0;
  return (
    <li className="">
      <Image src={gift.img_url} alt={gift.gift_name} width={150} height={150} />
      <div>{gift.gift_name}</div>
      <div>{gift.brand_name}</div>
      <div>{gift.point}</div>
      <div>{gift.category}</div>
      <Button onClick={handleOpenConfirmModal}>교환버튼</Button>
    </li>
  );
}

export default GiftItem;
