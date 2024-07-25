import { AlertModalProps, ModalProps } from "@/types/modal.type";
import Button from "../Button/Button";

function AlertModal({ content, subContent, onClose }: AlertModalProps) {
  return (
    <div>
      <h6 className="text-center">{content}</h6>
      {subContent && <p className="text-center">{subContent}</p>}
      <div className="flex justify-center items-center">
        <Button onClick={onClose}>확인</Button>
      </div>
    </div>
  );
}

export default AlertModal;
