"use client";

import { ChangeEvent, useState } from "react";

function UserSettingPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [isNew, setIsNew] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [isPerfect, setIsPerfect] = useState(false);

  const oldPassword = "123123";
  /** <새 비밀번호 유효성 검사>
   * 1. 기존 비밀번호와 달라야 함
   * 2. 비밀번호 4자 미만이거나 특수문자가 포함될 경우 : "비밀번호는 영문(소문자), 숫자 4자리 이상 12자리 이하만 가능해요."
   * 3. 모든 조건이 통과될 경우 :
   * 4. 모든 조건이 통과되기 전까지 회원가입 완료하기 버튼 잠금 기능! -> 아직...
   */

  const checkPassword = (e: ChangeEvent<HTMLInputElement>) => {
    //유효성 검사: 기존 비밀번호
    if (newPassword === oldPassword) {
      setIsNew(false);
    } else {
      setIsNew(true);
    }

    //유효성 검사: 4자 이상, 특수문자 미포함
    const regex = /^[a-z\d]{4,12}$/;
    const passwordTest = regex.test(newPassword);
    if (!passwordTest) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }

    //유효성 검사 통과 : "사용 가능한 비밀번호 입니다."
    if (isNew && isValid) {
      setIsPerfect(true);
    }
  };

  return (
    <div className="AuthInputDiv">
      <label>새 비밀번호</label>
      <input
        type="password"
        value={newPassword}
        placeholder="새로운 비밀번호를 입력해주세요"
        className="AuthInput"
        onChange={(e) => {
          setNewPassword(e.target.value);
          checkPassword(e);
        }}
      />
      {isNew ? "" : <p className="AuthStateInfo">기존 비밀번호와 일치해요</p>}

      {isValid ? "" : <p className="AuthStateInfo">비밀번호는 영문(소문자), 숫자 4자리 이상 12자리 이하만 가능해요</p>}

      {isPerfect ? <p className="AuthStateInfoGreen">가능한 비밀번호 입니다</p> : ""}
    </div>
  );
}

export default UserSettingPassword;
