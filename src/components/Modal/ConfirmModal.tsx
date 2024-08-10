import Button from "@/components/Button/Button";
import DefaultModalTemplate from "@/components/Modal/DefaultModalTemplate";
import { ConfirmModalProps } from "@/types/modal.type";

function ConfirmModal({ content, subContent, buttonContent, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <DefaultModalTemplate content={content} subContent={subContent}>
      <div className="flex gap-5">
        <Button variant="white" size="medium" onClick={onCancel}>
          취소
        </Button>
        <Button variant="trueBlack" size="medium" onClick={onConfirm}>
          {buttonContent || "확인"}
        </Button>
      </div>
    </DefaultModalTemplate>
  );
}

export default ConfirmModal;
