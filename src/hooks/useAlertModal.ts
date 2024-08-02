import { useModal } from "@/provider/contexts/ModalContext";

const useAlertModal = () => {
  const { open, isOpen } = useModal();

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

  return { displayDefaultAlert };
};

export default useAlertModal;
