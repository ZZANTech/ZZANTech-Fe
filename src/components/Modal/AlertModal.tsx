import { ModalProps } from "@/provider/contexts/modalContext";
import Button from "../Button/Button";

function AlertModal({ type, title, description, onConfirm }: ModalProps) {
  return (
    <div>
      <h6 className="text-center">{title}</h6>
      {description && <p className="text-center">{description}</p>}
      <div className="flex justify-center items-center">
        <Button onClick={onConfirm}>확인</Button>
      </div>
    </div>
  );
}

export default AlertModal;
