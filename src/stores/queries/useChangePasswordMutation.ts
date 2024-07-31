import { patchPassword } from "@/apis/auth";
import { TPasswordError } from "@/app/(main)/mypage/edit/_components/UserEditPassword";
import useAlertModal from "@/hooks/useAlertModal";
import { TChangePassword } from "@/types/user.type";
import { useMutation } from "@tanstack/react-query";

const useChangePasswordMutation = (
  setPasswordError: React.Dispatch<React.SetStateAction<TPasswordError>>,
  setIsErrorVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { displayDefaultAlert } = useAlertModal();
  const { mutateAsync: updatePassword } = useMutation<string, { status: number; message: string }, TChangePassword>({
    mutationFn: (password) => patchPassword(password),
    onSuccess: (successMessage) => displayDefaultAlert(successMessage),

    onError: (e) => {
      if (e.status === 401) {
        setPasswordError((prev) => ({ ...prev, oldPassword: e.message }));
      }
      if (e.status === 422) {
        setPasswordError((prev) => ({ ...prev, newPassword: e.message }));
      }
      setIsErrorVisible(true);
    }
  });
  return { updatePassword };
};

export default useChangePasswordMutation;
