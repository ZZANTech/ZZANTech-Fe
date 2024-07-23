function RecheckPasswordForm({ recheckPassword, setRecheckPassword, password }) {
  return (
    <form className="flex flex-col w-[500px] gap-2.5 p-2.5 bg-white">
      <label>비밀번호 확인</label>
      <input
        type="password"
        value={recheckPassword}
        placeholder="비밀번호를 다시 입력해주세요"
        className="w-100% h-[56px] p-[16px] border"
        onChange={(e) => {
          setRecheckPassword(e.target.value);
        }}
      />
      {recheckPassword !== password ? <p className="text-red-500 text-xs">비밀번호가 틀립니다.</p> : ""}
      {recheckPassword === password ? <p className="text-green-500 text-xs">비밀번호가 일치합니다.</p> : ""}
    </form>
  );
}

export default RecheckPasswordForm;
