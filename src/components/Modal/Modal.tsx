"use client";
import AlertModal from "./AlertModal";
import ConfirmModal from "./ConfirmModal";
import BackDrop from "./BackDrop";
import { ModalProps, ConfirmModalProps, AlertModalProps } from "@/types/modal.type";

const Modal = (props: ModalProps) => {
  const renderModal = () => {
    if (props.type === "confirm") {
      const confirmProps = props as ConfirmModalProps;
      return (
        <ConfirmModal
          type={confirmProps.type}
          content={confirmProps.content}
          subContent={confirmProps.subContent}
          onConfirm={confirmProps.onConfirm}
          onCancel={confirmProps.onCancel}
        />
      );
    } else if (props.type === "alert") {
      const alertProps = props as AlertModalProps;
      return (
        <AlertModal
          type={alertProps.type}
          content={alertProps.content}
          subContent={alertProps.subContent}
          onClose={alertProps.onClose}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <BackDrop>
      <div className="relative bg-white p-10 rounded min-w-[340px]">
        <article className="px-6 py-2 text-lg">{renderModal()}</article>
      </div>
    </BackDrop>
  );
};

export default Modal;
