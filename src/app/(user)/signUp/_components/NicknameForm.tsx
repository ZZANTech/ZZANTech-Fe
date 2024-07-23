import React from "react";

function NicknameForm({ nickname, setNickname }) {
  return (
    <div className="flex flex-col w-[500px] gap-2.5 p-2.5 bg-white">
      <label>닉네임</label>
      <form className="flex flex-row gap-2.5">
        <input
          type="text"
          value={nickname}
          placeholder="닉네임을 입력해주세요"
          className="w-[400px] h-[56px] p-[16px] border"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <button className="w-[92px] text-white bg-[#C0C0C0] text-sm">중복체크</button>
      </form>
      <p className="text-red-500 text-xs">동일한 닉네임이 있습니다.</p>
    </div>
  );
}

export default NicknameForm;
