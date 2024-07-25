export type ModalProps = ConfirmModalProps | AlertModalProps;

export type ConfirmModalProps = {
  type: "confirm";
  content: string;
  subContent?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export type AlertModalProps = {
  type: "alert";
  content: string;
  subContent?: string;
  onClose?: () => void;
};
