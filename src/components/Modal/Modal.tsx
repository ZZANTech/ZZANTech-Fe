"use client";
import { ModalProps } from "@/types/modal.type";
import AlertModal from "./AlertModal";
import ConfirmModal from "./ConfirmModal";
import BackDrop from "./BackDrop";

const Modal = ({ type, content, subContent, onConfirm, onCancel, onClose }: ModalProps) => {
  const handleCloseModal = () => {
    if (onClose) onClose();
  };
  const renderModal = () => {
    switch (type) {
      case "confirm":
        return (
          <ConfirmModal
            type={type}
            content={content}
            subContent={subContent}
            onConfirm={onConfirm}
            onCancel={onCancel || onClose}
          />
        );

      case "alert":
        return <AlertModal type={type} content={content} subContent={subContent} onConfirm={onConfirm} />;

      default:
        return null;
    }
  };
  return (
    <BackDrop>
      <div className="relative bg-white p-10 rounded min-w-[340px]">
        {/* <button onClick={handleCloseModal} className="absolute top-2 right-2"></button> */}
        <div className="px-6 py-2 text-lg">{renderModal()}</div>
      </div>
    </BackDrop>
  );
};
export default Modal;
