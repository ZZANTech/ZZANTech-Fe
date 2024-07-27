"use client";

import { checkNicknameAvailability, updateNickname, updatePassword } from "@/apis/auth/mypage/mypageInfo";
import { validateNickname, validatePassword } from "@/app/(main)/mypage/setting/_components/validate";
import { useState, ChangeEvent } from "react";

const UserSettingContainer: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [nicknameError, setNicknameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const userId = "ee9f2051-3d18-4353-852d-f07d3e2f9c43";

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    const error = validateNickname(value);
    setNicknameError(error);
    setIsNicknameValid(!error);
  };

  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    const error = validatePassword(oldPassword, value, confirmPassword);
    setPasswordError(error);
    setIsPasswordValid(!error);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    const error = validatePassword(oldPassword, newPassword, value);
    setPasswordError(error);
    setIsPasswordValid(!error);
  };

  const handleNicknameSubmit = async () => {
    const isAvailable = await checkNicknameAvailability(nickname);
    if (!isAvailable) {
      setNicknameError("이미 사용 중인 닉네임입니다.");
      return;
    }
    await updateNickname(userId, nickname); // userId를 전달합니다.
  };

  const handlePasswordSubmit = async () => {
    const error = validatePassword(oldPassword, newPassword, confirmPassword);
    if (error) {
      setPasswordError(error);
      return;
    }
    await updatePassword(userId, oldPassword, newPassword); // userId를 전달합니다.
  };

  return (
    <div className="w-[400px]">
      <h2>회원 정보</h2>

      <div className="flex flex-col gap-5">
        <h3>닉네임 변경</h3>
        <input type="text" value={nickname} onChange={handleNicknameChange} />
        {nicknameError && <p>{nicknameError}</p>}
        <button onClick={handleNicknameSubmit} disabled={!isNicknameValid}>
          닉네임 변경하기
        </button>
      </div>

      <div className="flex flex-col gap-5">
        <h3>비밀번호 변경</h3>
        <input type="password" placeholder="기존 비밀번호" value={oldPassword} onChange={handleOldPasswordChange} />

        <input type="password" placeholder="새 비밀번호" value={newPassword} onChange={handleNewPasswordChange} />

        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />

        {passwordError && <p>{passwordError}</p>}
        <button onClick={handlePasswordSubmit} disabled={!isPasswordValid}>
          비밀번호 변경하기
        </button>
      </div>
    </div>
  );
};

export default UserSettingContainer;
