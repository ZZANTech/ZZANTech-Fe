import { useModal } from "@/provider/contexts/ModalContext";

const useConfirmModal = () => {
  const { open, isOpen } = useModal();

  const displayDeleteModal = (onConfirm: () => void) => {
    if (isOpen) {
      return;
    }
    open({
      type: "confirm",
      content: "정말 삭제하시겠습니까?",
      buttonContent: "삭제",
      onConfirm
    });
  };

  return { displayDeleteModal };
};

export default useConfirmModal;
