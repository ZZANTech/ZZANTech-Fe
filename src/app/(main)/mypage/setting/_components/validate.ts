// 변경할 닉네임 유효성 검사 -> 리턴: 에러메시지 또는 빈칸
export const validateNickname = (nickname: string): string => {
  if (nickname.length < 3 || nickname.length > 12) {
    return "닉네임은 3자 이상 12자 이하여야 합니다.";
  }
  if (/[^a-zA-Z0-9]/.test(nickname)) {
    return "닉네임에는 특수문자를 사용할 수 없습니다.";
  }
  return "";
};

// 변경할 비밀번호 유효성 검사 -> 리턴: 에러메시지 또는 빈칸
export const validatePassword = (oldPassword: string, newPassword: string, confirmPassword: string): string => {
  if (newPassword.length < 6 || newPassword.length > 12) {
    return "비밀번호는 6자 이상 12자 이하여야 합니다.";
  }
  if (/[^a-zA-Z0-9]/.test(newPassword)) {
    return "비밀번호에는 특수문자를 사용할 수 없습니다.";
  }
  if (oldPassword === newPassword) {
    return "기존 비밀번호와 다르게 설정해야 합니다.";
  }
  if (newPassword !== confirmPassword) {
    return "새 비밀번호와 일치하지 않습니다.";
  }
  return "";
};
