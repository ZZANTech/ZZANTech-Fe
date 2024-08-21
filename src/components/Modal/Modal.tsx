"use client";
import AlertModal from "@/components/Modal/AlertModal";
import BackDrop from "@/components/Modal/BackDrop";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import NicknameModal from "@/components/Modal/NicknameModal";
import { ModalProps, ConfirmModalProps, AlertModalProps, NicknameModalProps } from "@/types/modal.type";
import xBtn from "/public/icons/x_btn.svg";
import Image from "next/image";
import { useModal } from "@/provider/contexts/ModalContext";

const Modal = (props: ModalProps) => {
  const { close } = useModal();
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
            buttonContent={confirmProps.buttonContent}
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
            buttonContent={alertProps.buttonContent}
            onClose={alertProps.onClose || (() => {})}
          />
        );
      case "nickname":
        return <NicknameModal />;
      default:
        return null;
    }
  };

  return (
    <BackDrop>
      <div className="relative px-[50px] bg-white rounded-3xl min-w-[500px] min-h-[300px]">
        <article className=" text-lg">
          <Image
            onClick={close}
            className="absolute cursor-pointer top-5 right-4"
            src={xBtn}
            alt="x_btn"
            width={28}
            height={28}
          />
          {renderModal()}
        </article>
      </div>
    </BackDrop>
  );
};

export default Modal;
