import { useModal } from "@/provider/contexts/ModalContext";

const useErrorModal = () => {
  const { open } = useModal();

  const displayErrorModal = (content: string) => {
    open({
      type: "alert",
      content
    });
  };

  return displayErrorModal;
};

export default useErrorModal;
