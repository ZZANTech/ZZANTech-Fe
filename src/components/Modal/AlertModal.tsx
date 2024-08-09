import Button from "@/components/Button/Button";
import DefaultModalTemplate from "@/components/Modal/DefaultModalTemplate";
import { AlertModalProps } from "@/types/modal.type";

function AlertModal({ content, subContent, buttonContent, onClose }: AlertModalProps) {
  return (
    <DefaultModalTemplate content={content} subContent={subContent}>
      <Button onClick={onClose} variant="trueBlack" size="large" weight="semibold">
        {buttonContent || "확인"}
      </Button>
    </DefaultModalTemplate>
  );
}
export default AlertModal;
