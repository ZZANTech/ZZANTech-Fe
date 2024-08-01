"use client";
import AlertModal from "@/components/Modal/AlertModal";
import BackDrop from "@/components/Modal/BackDrop";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import NicknameModal from "@/components/Modal/NicknameModal";
import { ModalProps, ConfirmModalProps, AlertModalProps, NicknameModalProps } from "@/types/modal.type";

const Modal = (props: ModalProps) => {
  const renderModal = () => {
    switch (props.type) {
      case "confirm":
        const confirmProps = props as ConfirmModalProps;
        return (
          <ConfirmModal
            type={confirmProps.type}
            content={confirmProps.content}
            subContent={confirmProps.subContent || ""}
            onConfirm={confirmProps.onConfirm}
            onCancel={confirmProps.onCancel || (() => {})}
          />
        );
      case "alert":
        const alertProps = props as AlertModalProps;
        return (
          <AlertModal
            type={alertProps.type}
            content={alertProps.content}
            subContent={alertProps.subContent || ""}
            onClose={alertProps.onClose || (() => {})}
          />
        );
      case "nickname":
        const nicknameProps = props as NicknameModalProps;
        return <NicknameModal />;
      default:
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
