import { splitMessage } from "@/utils/splitMessage";

// 마이페이지 : 비밀번호 유효성 검사
export const validatePassword = (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  displayDefaultAlert: (content: string, subContent?: string, buttonContent?: string) => void
): void => {
  if (!oldPassword) {
    displayDefaultAlert("비밀번호를 입력 해 주세요");
  }

  if (!newPassword || newPassword.length < 5 || newPassword.length > 20) {
    const { firstLine, secondLine } = splitMessage("적합하지 않은 비밀번호입니다 8~16자 이내로 다시 입력해 주세요");
    displayDefaultAlert(firstLine, secondLine);
  }

  if (newPassword !== confirmPassword) {
    const { firstLine, secondLine } = splitMessage("새 비밀번호가 일치하지 않습니다 정확하게 다시 입력해 주세요");
    displayDefaultAlert(firstLine, secondLine);
  }
};
