"use client";

import { useState } from "react";

function PasswordForm({ password, setPassword }) {
  const [isPasswordCorrected, setIsPasswordCorrected] = useState(false);

  /** <비밀번호 유효성 검사>
   * 1. 빈칸 일 경우 : "비밀번호를 입력해주세요" ==> 유효성 삭제 (비밀번호 간략화)
   * 2. 비밀번호 3자 미만일 경우 : "비밀번호는 세 글자 이상이어야 합니다."
   * 3. 특수문자가 포함될 경우 : "특수문자는 포함될 수 없습니다."
   * 4. 모든 조건이 통과되기 전까지 회원가입 완료하기 버튼 잠금 기능!
   */

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
          const regex = /^[a-z\d]{4,12}$/;
          const passwordTest = regex.exec(password);
          if (!passwordTest) {
            setIsPasswordCorrected(true);
          } else {
            setIsPasswordCorrected(false);
          }
        }}
      />
      {isPasswordCorrected ? (
        <p className="text-red-500 text-xs">비밀번호는 영문(소문자), 숫자 4자리 이상 12자리 이하만 가능해요</p>
      ) : (
        ""
      )}
    </form>
  );
}

export default PasswordForm;
