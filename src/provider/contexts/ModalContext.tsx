"use client";
import Modal from "@/components/Modal/Modal";
import { ModalProps } from "@/types/modal.type";
import { createContext, ReactNode, useContext, useState } from "react";

type ModalContextProps = {
  open: (options: ModalProps) => void;
  close: () => void;
  isOpen: boolean;
};

const initialValue: ModalContextProps = {
  open: () => {},
  close: () => {},
  isOpen: false
};

const ModalContext = createContext<ModalContextProps>(initialValue);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalOptions, setModalOptions] = useState<ModalProps | null>(null);

  const handleConfirm = () => {
    if (modalOptions?.type === "confirm") {
      modalOptions.onConfirm();
      value.close();
    }
  };

  const handleCancel = () => {
    if (modalOptions?.type === "confirm") {
      modalOptions.onCancel?.();
      value.close();
    }
  };

  const handleClose = () => {
    if (modalOptions?.type === "alert") {
      modalOptions.onClose?.();
      value.close();
    }
  };

  const value = {
    open: (option: ModalProps) => {
      setModalOptions(option);
    },
    close: () => setModalOptions(null),
    isOpen: !!modalOptions
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalOptions && (
        <Modal
          type={modalOptions.type}
          content={"content" in modalOptions ? modalOptions.content : ""}
          subContent={"subContent" in modalOptions ? modalOptions.subContent : ""}
          onConfirm={modalOptions.type === "confirm" ? handleConfirm : () => {}}
          buttonContent={"buttonContent" in modalOptions ? modalOptions.buttonContent : ""}
          onCancel={modalOptions.type === "confirm" ? handleCancel : () => {}}
          onClose={modalOptions.type === "alert" || modalOptions.type === "nickname" ? handleClose : () => {}}
        />
      )}
    </ModalContext.Provider>
  );
};
