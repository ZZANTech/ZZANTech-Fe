"use client";

import { MouseEventHandler, useState } from "react";

function UserSettingNickname() {
  const [newNickname, setNewNickname] = useState<string>("");
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [isCorrected, setIsCorrected] = useState(false);

  const handleCheckDuplicate: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    // 수파베이스 함수 : update API
    // 수파베이스 함수 적용 전 더미데이터
    const users = "뿌뿌엥";

    if (users!.length > 0) {
      //users의 타입정의 필요
      setIsDuplicated(true);
      setIsCorrected(false);
    } else {
      setIsDuplicated(false);
      setIsCorrected(true);
    }
  };

  return (
    <div className="AuthInputDiv">
      <label>닉네임</label>
      <form className="AuthInputForm">
        <input
          type="text"
          value={newNickname}
          placeholder="닉네임을 입력해주세요"
          className="AuthInputShort"
          onChange={(e) => {
            setNewNickname(e.target.value);
          }}
        />
        <button className="AuthDupButton" onClick={handleCheckDuplicate}>
          중복체크
        </button>
      </form>
      {isDuplicated ? <p className="AuthStateInfo">동일한 닉네임이 있습니다.</p> : ""}
      {isCorrected ? <p className="AuthStateInfoGreen">사용 가능한 닉네임입니다.</p> : ""}
    </div>
  );
}

export default UserSettingNickname;
