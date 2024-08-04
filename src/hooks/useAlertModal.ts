"use client";
import { useModal } from "@/provider/contexts/ModalContext";
import { useRouter } from "next/navigation";

const useAlertModal = () => {
  const { open, isOpen } = useModal();
  const router = useRouter();

  const displayDefaultAlert = (content: string, subContent?: string, buttonContent?: string) => {
    if (isOpen) {
      return;
    }
    open({
      type: "alert",
      content,
      subContent,
      buttonContent
    });
  };

  const displayLoginAlert = () => {
    open({
      type: "alert",
      content: "로그인이 필요한 서비스에요",
      buttonContent: "로그인하기",
      onClose: () => router.push("/login")
    });
  };

  return { displayDefaultAlert, displayLoginAlert };
};

export default useAlertModal;
