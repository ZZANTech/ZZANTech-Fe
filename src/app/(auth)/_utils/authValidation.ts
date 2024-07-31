export const validatePassword = (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  displayDefaultAlert: (content: string) => void
): void => {
  if (!oldPassword) {
    displayDefaultAlert("비밀번호를 입력 해 주세요.");
  }

  if (!newPassword || newPassword.length < 5 || newPassword.length > 12) {
    displayDefaultAlert("비밀번호는 6자 이상 12자 이하이어야 합니다.");
  }

  if (newPassword !== confirmPassword) {
    displayDefaultAlert("새 비밀번호의 값이 일치하지 않습니다.");
  }
};
