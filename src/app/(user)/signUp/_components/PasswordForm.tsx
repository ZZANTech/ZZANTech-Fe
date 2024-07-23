import React from "react";

function PasswordForm({ password, setPassword }) {
  return (
    <form className="flex flex-col w-[500px] gap-2.5 p-2.5 bg-white">
      <label>비밀번호</label>
      <input
        type="password"
        value={password}
        placeholder="비밀번호를 입력해주세요"
        className="w-100% h-[56px] p-[16px] border"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {password.length < 3 || !password ? (
        <p className="text-red-500 text-xs">비밀번호는 8자 이상으로 입력해주세요</p>
      ) : (
        ""
      )}
    </form>
  );
}

export default PasswordForm;
