export type ModalProps = ConfirmModalProps | AlertModalProps | NicknameModalProps;

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

export type NicknameModalProps = {
  type: "nickname";
};
