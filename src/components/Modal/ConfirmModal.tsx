import { ModalProps } from "@/provider/contexts/modalContext";
import Button from "../Button/Button";

function ConfirmModal({ type, content, subContent, onConfirm, onCancel }: ModalProps) {
  return (
    <div>
      <h6 className="text-center">{content}</h6>
      {subContent && <p>{subContent}</p>}
      <div className="flex w-full justify-between mt-8">
        <Button onClick={onConfirm}>확인</Button>
        <Button onClick={onCancel}>취소</Button>
      </div>
    </div>
  );
}

export default ConfirmModal;
