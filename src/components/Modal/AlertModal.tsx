import Button from "@/components/Button/Button";
import { AlertModalProps } from "@/types/modal.type";

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
