import { TPasswordError } from "./../../(main)/mypage/edit/_components/UserEditPassword";
import { initialPasswordError } from "@/app/(main)/mypage/edit/_components/UserEditPassword";

export const validatePassword = (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  handleSetError: (e: TPasswordError) => void
): boolean => {
  const newErrorMessage = initialPasswordError;

  if (!oldPassword) {
    console.log(oldPassword);
    newErrorMessage.oldPassword = "비밀번호를 입력 해 주세요.";
  }

  if (!newPassword || newPassword.length < 5 || newPassword.length > 12) {
    newErrorMessage.newPassword = "비밀번호는 6자 이상 12자 이하이어야 합니다.";
  }

  // if (/[^a-zA-Z0-9]/.test(newPassword)) {
  //   newErrorMessage.newPassword = "비밀번호에 특수문자는 포함될 수 없습니다.";
  // }

  // if (oldPassword === newPassword) {
  //   newErrorMessage.newPassword = "기존 비밀번호와 달라야 합니다.";
  // }

  if (newPassword !== confirmPassword) {
    newErrorMessage.confirmPassword = "새 비밀번호의 값이 일치하지 않습니다.";
  }
  console.log(newErrorMessage);
  if (newErrorMessage.newPassword || newErrorMessage.confirmPassword || newErrorMessage.oldPassword) {
    handleSetError(newErrorMessage);
    return false;
  }
  return true;
};

export const CheckPasswordValidity = ({
  oldPassword,
  newPassword,
  setPasswordError,
  setIsPasswordValidState
}: {
  oldPassword: string;
  newPassword: string;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
  setIsPasswordValidState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (newPassword.length < 5 || newPassword.length > 12) {
    setPasswordError("비밀번호는 6자 이상 12자 이하이어야 합니다.");
    setIsPasswordValidState(false);
    return;
  }
  if (/[^a-zA-Z0-9]/.test(newPassword)) {
    setPasswordError("비밀번호에 특수문자는 포함될 수 없습니다.");
    setIsPasswordValidState(false);
    return;
  }
  if (newPassword === oldPassword) {
    setPasswordError("기존 비밀번호와 달라야 합니다.");
    setIsPasswordValidState(false);
    return;
  }
  setPasswordError("");
  setIsPasswordValidState(true);
};
