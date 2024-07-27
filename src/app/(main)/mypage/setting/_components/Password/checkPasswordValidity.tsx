export const CheckPasswordValidity = ({ oldPassword, newPassword, setPasswordError, setIsPasswordValidState }) => {
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
