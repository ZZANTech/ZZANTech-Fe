"use client";

import { validatePassword } from "@/app/(auth)/_utils/authValidation";
import ErrorMessage from "@/app/(main)/boards/knowhow/_components/ErrorMessage";
import useAlertModal from "@/hooks/useAlertModal";
import useChangePasswordMutation from "@/stores/queries/useChangePasswordMutation";
import { FormEventHandler, useDebugValue, useState } from "react";

export const initialPasswordError = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
};
export type TPasswordError = typeof initialPasswordError;

function UserEditPassword() {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<TPasswordError>(initialPasswordError);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const { updatePassword } = useChangePasswordMutation(setPasswordError, setIsErrorVisible);

  const handleSetError = (e: TPasswordError) => {
    setPasswordError(e);
    setIsErrorVisible(true);
  };

  const handleChangePassword: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const isValid = validatePassword(oldPassword, newPassword, confirmPassword, handleSetError);
      // if (!isValid) return;
      console.log(isValid);
      const res = await updatePassword({ oldPassword, newPassword });
      console.log("ads");
      console.log(res);
    } catch (e) {
      //  setPasswordError()

      if (e instanceof Error) {
        // const errorMessage = e.message.replace(/^Error: /, "");
        // setPasswordError((prev) => ({ ...prev, oldPassword: errorMessage }));
        // setIsErrorVisible(true);
      }
    } finally {
      const { oldPassword, newPassword, confirmPassword } = passwordError;
      if (oldPassword || newPassword || confirmPassword) {
        setIsErrorVisible(true);
      }
    }
  };

  return (
    <form onSubmit={handleChangePassword} className="flex flex-col gap-5 box-border">
      <label>기존 비밀번호</label>
      <input
        type="text"
        value={oldPassword}
        placeholder="기존 비밀번호를 입력해주세요"
        className="AuthInput"
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <ErrorMessage className="AuthStateInfo">
        {isErrorVisible && passwordError.oldPassword ? passwordError.oldPassword : ""}
      </ErrorMessage>

      <label>새 비밀번호</label>
      <input
        type="text"
        value={newPassword}
        placeholder="새로운 비밀번호를 입력해주세요"
        className="AuthInput"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <ErrorMessage className="AuthStateInfo">
        {isErrorVisible && passwordError.newPassword ? passwordError.newPassword : ""}
      </ErrorMessage>

      <label>새 비밀번호 확인</label>
      <input
        type="text"
        value={confirmPassword}
        placeholder="새로운 비밀번호를 다시 입력해주세요"
        className="AuthInput"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <ErrorMessage className="AuthStateInfo">
        {isErrorVisible && passwordError.confirmPassword ? passwordError.confirmPassword : ""}
      </ErrorMessage>

      <button>비밀번호 변경</button>
    </form>
  );
}

export default UserEditPassword;
