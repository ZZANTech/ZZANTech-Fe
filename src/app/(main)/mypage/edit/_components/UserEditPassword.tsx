"use client";

import { validatePassword } from "@/app/(auth)/_utils/authValidation";
import useAlertModal from "@/hooks/useAlertModal";
import useChangePasswordMutation from "@/stores/queries/useChangePasswordMutation";
import { FormEventHandler, useState } from "react";

function UserEditPassword() {
  const { displayDefaultAlert } = useAlertModal();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { updatePassword } = useChangePasswordMutation();

  const handleChangePassword: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    validatePassword(oldPassword, newPassword, confirmPassword, displayDefaultAlert);
    await updatePassword({ oldPassword, newPassword });
  };

  return (
    <form onSubmit={handleChangePassword} className="flex flex-col gap-5 box-border">
      <label>기존 비밀번호</label>
      <input
        type="password"
        value={oldPassword}
        placeholder="기존 비밀번호를 입력해주세요"
        className="AuthInput"
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <label>새 비밀번호</label>
      <input
        type="password"
        value={newPassword}
        placeholder="새로운 비밀번호를 입력해주세요"
        className="AuthInput"
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <label>새 비밀번호 확인</label>
      <input
        type="password"
        value={confirmPassword}
        placeholder="새로운 비밀번호를 다시 입력해주세요"
        className="AuthInput"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button>비밀번호 변경</button>
    </form>
  );
}

export default UserEditPassword;
