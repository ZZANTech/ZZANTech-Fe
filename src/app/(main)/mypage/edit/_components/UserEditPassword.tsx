"use client";

import { validatePassword } from "@/app/(auth)/_utils/authValidation";
import useAlertModal from "@/hooks/useAlertModal";
import useChangePasswordMutation from "@/stores/queries/auth/useChangePasswordMutation";
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
    <div className="w-[348px] h-[412px] mx-auto mt-[100pt]">
      <h1 className="font-xl font-semibold mb-12 leading-7">비밀번호 변경</h1>
      <form onSubmit={handleChangePassword} className="flex flex-col box-border ">
        <div className="flex flex-col gap-6 mb-[80pt]">
          <div className="flex flex-col gap-2">
            <label className="text-sm leading-5">기존 비밀번호</label>
            <input
              type="password"
              value={oldPassword}
              placeholder="기존 비밀번호를 입력해주세요"
              className="AuthInput"
              maxLength={20}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            {" "}
            <label className="text-sm leading-5">새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              placeholder="새로운 비밀번호를 입력해주세요"
              className="AuthInput"
              maxLength={20}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            {" "}
            <label className="text-sm leading-5">새 비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="새로운 비밀번호를 다시 입력해주세요"
              className="AuthInput"
              maxLength={20}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="p-4 rounded-lg font-semibold leading-6 bg-gray-100 text-[#999999]">비밀번호 변경</button>
      </form>
    </div>
  );
}

export default UserEditPassword;
