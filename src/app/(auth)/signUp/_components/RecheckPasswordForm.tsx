function RecheckPasswordForm({
  recheckPassword,
  setRecheckPassword,
  password
}: {
  recheckPassword: string;
  setRecheckPassword: (recheckPassword: string) => void;
  password: string;
}) {
  return (
    <div className="AuthInputDiv">
      <label>비밀번호 확인</label>
      <input
        type="password"
        value={recheckPassword}
        placeholder="비밀번호를 다시 입력해주세요"
        className="AuthInput"
        onChange={(e) => {
          setRecheckPassword(e.target.value);
        }}
      />
      {recheckPassword !== password ? <p className="AuthStateInfo">비밀번호가 틀립니다.</p> : ""}
      {recheckPassword === password ? <p className="AuthStateInfoGreen">비밀번호가 일치합니다.</p> : ""}
    </div>
  );
}

export default RecheckPasswordForm;
