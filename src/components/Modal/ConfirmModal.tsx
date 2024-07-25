import { ConfirmModalProps } from "@/types/modal.type";
import Button from "../Button/Button";

function ConfirmModal({ content, subContent, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div>
      <h6 className="text-center">{content}</h6>
      {subContent && <p>{subContent}</p>}
      <div className="flex w-full justify-evenly mt-8">
        <Button onClick={onCancel}>취소</Button>
        <Button onClick={onConfirm}>확인</Button>
      </div>
    </div>
  );
}

export default ConfirmModal;
