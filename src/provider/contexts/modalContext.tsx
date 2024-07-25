"use client";

import Modal from "@/components/Modal/Modal";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type ModalContextProps = {
  open: (options: ModalProps) => void;
  close: () => void;
  isOpen: boolean;
};

export type ModalProps = {
  type: "confirm" | "alert";
  content: string;
  subContent?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose?: () => void;
};

const initialValue: ModalContextProps = {
  open: () => {},
  close: () => {},
  isOpen: false
};

const ModalContext = createContext<ModalContextProps>(initialValue);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalOptions, setModalOptions] = useState<ModalProps | null>(null);

  const value = {
    open: (option: ModalProps) => {
      setModalOptions(option);
    },

    close: () => {
      if (modalOptions?.onClose) {
        modalOptions.onClose();
      }

      setModalOptions(null);
    },
    isOpen: !!modalOptions
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalOptions && (
        <Modal
          type={modalOptions.type}
          content={modalOptions.content}
          subContent={modalOptions.subContent}
          onConfirm={modalOptions.onConfirm}
          onCancel={modalOptions.onCancel}
          onClose={value.close}
        />
      )}
    </ModalContext.Provider>
  );
};
