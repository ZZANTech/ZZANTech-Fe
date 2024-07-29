export const CheckNicknameValidity = ({
  nickname,
  setNicknameError,
  setIsNicknameValid
}: {
  nickname: string;
  setNicknameError: React.Dispatch<React.SetStateAction<string>>;
  setIsNicknameValid: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!nickname) {
    setNicknameError("빈칸을 채워주세요.");
    setIsNicknameValid(false);
    return;
  }

  if (nickname.length < 3 || nickname.length > 12) {
    setNicknameError("닉네임은 3자 이상 12자 이하여야 합니다.");
    setIsNicknameValid(false);
    return;
  }
  if (/[^a-zA-Z0-9]/.test(nickname)) {
    setNicknameError("닉네임에는 특수문자를 사용할 수 없습니다.");
    setIsNicknameValid(false);
    return;
  }
  setNicknameError("");
  setIsNicknameValid(true);
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
