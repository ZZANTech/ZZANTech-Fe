import { useModal } from "@/provider/contexts/ModalContext";

const useAlertModal = () => {
  const { open, isOpen } = useModal();

  const displayDefaultAlert = (content: string) => {
    if (isOpen) {
      return;
    }
    open({
      type: "alert",
      content
    });
  };

  return { displayDefaultAlert };
};

export default useAlertModal;
