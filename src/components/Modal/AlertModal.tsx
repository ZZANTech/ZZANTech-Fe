import Button from "@/components/Button/Button";
import DefaultModalTemplate from "@/components/Modal/DefaultModalTemplate";
import { AlertModalProps } from "@/types/modal.type";

function AlertModal({ content, subContent, buttonContent, onClose }: AlertModalProps) {
  return (
    <DefaultModalTemplate content={content} subContent={subContent}>
      <Button className="w-[400px] h-[74px] px-5 py-3 rounded-e-xl text-xl" onClick={onClose}>
        {buttonContent || "확인"}
      </Button>
    </DefaultModalTemplate>
  );
}
export default AlertModal;
