"use client";
import Button from "@/components/Button/Button";
import { useUserContext } from "@/provider/contexts/UserContext";
import useExchangeMutation from "@/stores/queries/useExchangeMutation";
import { Tables } from "@/types/supabase";
import Image from "next/image";

type GiftItemProps = {
  gift: Tables<"gifts">;
};

function GiftItem({ gift }: GiftItemProps) {
  const { user } = useUserContext();
  const { addClaim } = useExchangeMutation();
  const handleExchange = async () => {
    const newExchange = {
      gift_id: gift.giftId,
      user_id: user?.userId
    };
    await addClaim(newExchange);
  };
  const userCurrentPoints = user?.current_point ?? 0;
  return (
    <li className="">
      <Image src={gift.img_url} alt={gift.gift_name} width={150} height={150} />
      <div>{gift.gift_name}</div>
      <div>{gift.brand_name}</div>
      <div>{gift.point}</div>
      <div>{gift.category}</div>
      <Button onClick={handleExchange}>교환버튼</Button>
    </li>
  );
}

export default GiftItem;
