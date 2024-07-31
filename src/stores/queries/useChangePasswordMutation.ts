import { patchPassword } from "@/apis/auth";
import useAlertModal from "@/hooks/useAlertModal";
import { TChangePassword } from "@/types/user.type";
import { useMutation } from "@tanstack/react-query";

const useChangePasswordMutation = () => {
  const { displayDefaultAlert } = useAlertModal();
  const { mutateAsync: updatePassword } = useMutation<string, { status: number; message: string }, TChangePassword>({
    mutationFn: (password) => patchPassword(password),
    onSuccess: (successMessage) => displayDefaultAlert(successMessage),

    onError: (e) => displayDefaultAlert(e.message)
  });
  return { updatePassword };
};

export default useChangePasswordMutation;
