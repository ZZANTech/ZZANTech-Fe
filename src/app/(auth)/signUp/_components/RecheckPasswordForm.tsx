function RecheckPasswordForm({
  confirmPassword,
  setConfirmPassword,
  password
}: {
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  password: string;
}) {
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="AuthInputDiv">
      <label>비밀번호 확인</label>
      <input
        type="password"
        value={confirmPassword}
        placeholder="비밀번호를 다시 입력해주세요"
        className={`AuthInput ${confirmPassword && (confirmPassword !== password ? "border-info-red" : "border-info-green")}`}
        onChange={handleConfirmPasswordChange}
      />
      {confirmPassword && confirmPassword !== password && <p className="AuthStateInfo">비밀번호가 틀립니다.</p>}
      {confirmPassword && confirmPassword === password && <p className="AuthStateInfoGreen">비밀번호가 일치합니다.</p>}
    </div>
  );
}

export default RecheckPasswordForm;
