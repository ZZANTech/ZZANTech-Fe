import { patchPassword } from "@/apis/auth";
import useAlertModal from "@/hooks/useAlertModal";
import { useModal } from "@/provider/contexts/ModalContext";
import { TChangePassword } from "@/types/user.type";
import { splitMessage } from "@/utils/splitMessage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useChangePasswordMutation = () => {
  const router = useRouter();
  const { open } = useModal();
  const { displayDefaultAlert } = useAlertModal();
  const { mutateAsync: updatePassword } = useMutation<string, { status: number; message: string }, TChangePassword>({
    mutationFn: (password) => patchPassword(password),
    onSuccess: (successMessage) => {
      open({
        type: "alert",
        content: successMessage,
        onClose: () => router.replace("/mypage")
      });
    },

    onError: (e) => {
      const { firstLine, secondLine } = splitMessage(e.message);
      displayDefaultAlert(firstLine, secondLine);
    }
  });
  return { updatePassword };
};

export default useChangePasswordMutation;
