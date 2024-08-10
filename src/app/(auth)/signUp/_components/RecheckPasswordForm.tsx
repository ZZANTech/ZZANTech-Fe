function RecheckPasswordForm({
  confirmPassword,
  setConfirmPassword,
  password,
  setConfirmPasswordValid
}: {
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  password: string;
  setConfirmPasswordValid: (confirmPasswordValid: boolean | null) => void;
}) {
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);

    if (confirmPassword === password) {
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordValid(false);
    }
  };

  return (
    <div className="flex flex-col">
      <label>비밀번호 확인</label>
      <input
        type="password"
        value={confirmPassword}
        maxLength={20}
        placeholder="최소 6~20자, 특수문자 가능"
        className={`auth-input ${confirmPassword && confirmPassword !== password ? "border-info-red" : "border-info-green"}`}
        onChange={handleConfirmPasswordChange}
      />
      {confirmPassword !== password && <p className="text-info-red text-xs">비밀번호가 틀립니다.</p>}
    </div>
  );
}

export default RecheckPasswordForm;
