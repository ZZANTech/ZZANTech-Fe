import { useModal } from "@/provider/contexts/ModalContext";

const useAlertModal = () => {
  const { open } = useModal();

  const displayDefaultAlert = (content: string) => {
    open({
      type: "alert",
      content
    });
  };

  return { displayDefaultAlert };
};

export default useAlertModal;
