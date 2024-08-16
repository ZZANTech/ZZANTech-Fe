"use client";
import Button from "@/components/Button/Button";
import { useModal } from "@/provider/contexts/ModalContext";
import { useUserContext } from "@/provider/contexts/UserContext";
import { Tables } from "@/types/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import point from "/public/icons/point.png";
import { formatNumberWithCommas } from "@/app/(main)/boards/_utils";
import useAlertModal from "@/hooks/useAlertModal";
import useExchangeMutation from "@/stores/queries/exchange/useExchangeMutation";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

type GiftItemProps = {
  gift: Tables<"gifts">;
};

function GiftItem({ gift }: GiftItemProps) {
  const { user } = useUserContext();
  const { open, close } = useModal();
  const { displayDefaultAlert, displayLoginAlert } = useAlertModal();
  const { addClaim, isPending } = useExchangeMutation();
  const formattedPoint = formatNumberWithCommas(gift.point);
  const router = useRouter();
  const handleExchange = async () => {
    if (isPending) return;
    if (Number(gift?.point) > Number(user?.current_point)) {
      setTimeout(() => displayDefaultAlert("포인트가 부족합니다"), 100);
      return;
    }
    const newExchange = {
      gift_id: gift.giftId,
      user_id: user?.userId
    };
    await addClaim(newExchange);
  };
  const handleOpenConfirmModal = () => {
    if (!user) {
      displayLoginAlert();
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

  const isTeslaImage = gift.img_url.includes("tesla");

  return (
    <li className="flex flex-col items-center p-4 w-[268px] h-[403px] border border-[#e3e3e5] rounded-2xl box-border">
      <div className="w-[236px] h-[200px] mb-3 flex justify-center items-center relative">
        <Image
          className={isTeslaImage ? "object-contain" : "object-cover"}
          priority
          loading="eager"
          src={gift.img_url}
          alt={gift.gift_name}
          fill
        />
      </div>

      <div className="mb-2 text-[#777] text-[13px]">[{gift.brand_name}]</div>
      <div className="mb-5 text-[#333] font-bold text-sm">{gift.gift_name}</div>
      <div className="flex items-center gap-[5px] mb-7">
        <div className="w-8 h-8 relative">
          <Image className="object-contain" src={point} alt="point" fill />
        </div>
        <span className="text-[#FF6000] font-semibold">{formattedPoint}P</span>
      </div>
      <button
        disabled={isPending}
        className="flex justify-center font-semibold rounded-lg items-center text-white w-[236px] bg-[#FF6000] h-10 p-4 box-border"
        onClick={handleOpenConfirmModal}
      >
        교환버튼
      </button>
      {isPending && <LoadingSpinner isSubmitting />}
    </li>
  );
}

export default GiftItem;
