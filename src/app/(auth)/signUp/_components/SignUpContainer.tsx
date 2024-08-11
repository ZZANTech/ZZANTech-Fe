"use client";

import { checkDuplication, checkDuplicationNickname, signUp } from "@/apis/auth";
import Button from "@/components/Button";
import useAlertModal from "@/hooks/useAlertModal";
import { TUserInsert } from "@/types/user.type";
import { checkEmailValidity, checkNicknameValidity, checkPasswordValidity } from "@/utils/authValidity";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignUpContainer() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [emailDup, setEmailDup] = useState<boolean | null>(null);

  const [nickname, setNickname] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [nicknameDup, setNicknameDup] = useState<boolean | null>(null);

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean | null>(null);

  const router = useRouter();
  const modal = useAlertModal();

  // 이메일 중복확인
  const handleCheckDuplicate: React.MouseEventHandler<HTMLButtonElement> = async () => {
    //초기화
    setEmailError("");
    setEmailDup(null);
    //유효성 검사: 중복확인
    if (emailError) {
      console.log("emailError", emailError);
      return;
    }
    if (!emailError) {
      try {
        checkDuplication({ email, setEmailError });
        if (emailError) {
          setEmailDup(false);
        } else {
          setEmailDup(true);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  // 닉네임 중복확인
  const handleCheckDuplicateNickname: React.MouseEventHandler<HTMLButtonElement> = async () => {
    //초기화
    setNicknameError("");
    setNicknameDup(null);
    //유효성 검사: 중복확인
    if (nicknameError) {
      console.log("nicknameError", nicknameError);
      return;
    }
    if (!nicknameError) {
      try {
        checkDuplicationNickname({ nickname, setNicknameError });
        if (nicknameError) {
          setNicknameDup(false);
        } else {
          setNicknameDup(true);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleClickSignUp = async () => {
    const data: TUserInsert = { email, nickname, password, confirmPassword };

    // 초기화
    setPasswordError("");
    setPasswordValid(null);
    setConfirmPasswordError("");
    setConfirmPasswordValid(null);

    console.log("emailDup", emailDup);
    console.log("nicknameDup", nicknameDup);
    console.log("passwordValid", passwordValid);
    console.log("confirmPasswordValid", confirmPasswordValid);

    //유효성 검사: 비밀번호
    checkPasswordValidity({ password, setPasswordError });
    if (passwordError !== "") {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
      return;
    }

    //유효성 검사: 비밀번호 확인
    if (password === confirmPassword) {
      setConfirmPasswordError("");
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordError("비밀번호와 일치하지 않습니다.");
      setConfirmPasswordValid(false);
    }

    // 모든 유효성이 통과 된 경우: signup api 통신
    if (!(emailDup && nicknameDup && passwordValid && confirmPasswordValid)) {
      modal.displayDefaultAlert("이메일/닉네임 중복확인 또는 비밀번호, 비밀번호 확인을 다시 확인해주세요.");
      return;
    }
    try {
      await signUp(data);
      modal.displayDefaultAlert("회원가입 성공!");
      router.replace("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-12">
      <h1 className="text-xl font-semibold">회원가입</h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label>이메일</label>
          <div className="flex flex-row gap-2.5">
            <input
              type="email"
              value={email}
              maxLength={30}
              placeholder="zzan@zzan.com"
              className={`auth-input-short ${emailError ? "border-info-red" : emailDup ? "border-info-green" : ""}`}
              onChange={(e) => {
                setEmail(e.target.value);
                checkEmailValidity({ email, setEmailError });
              }}
            />
            <Button size={"small"} disabled={emailError.length > 1 || email === ""} onClick={handleCheckDuplicate}>
              중복확인
            </Button>
          </div>
          <p className="text-info-red text-xs">{emailError}</p>
          <p className="text-info-green text-xs">{emailError ? "" : emailDup ? "사용 가능합니다" : ""}</p>
        </div>

        <div className="flex flex-col">
          <label>닉네임</label>
          <div className="flex flex-row gap-2.5">
            <input
              type="text"
              value={nickname}
              maxLength={7}
              placeholder="최소 2~7자 한글, 영어, 슷자"
              className={`auth-input-short ${nicknameError ? "border-info-red" : nicknameDup ? "border-info-green" : ""}`}
              onChange={(e) => {
                setNickname(e.target.value);
                checkNicknameValidity({ nickname, setNicknameError });
              }}
            />
            <Button
              size={"small"}
              disabled={nicknameError.length > 1 || nickname === ""}
              onClick={handleCheckDuplicateNickname}
            >
              중복확인
            </Button>
          </div>
          <p className="text-info-red text-xs">{nicknameError}</p>
          <p className="text-info-green text-xs">{nicknameError ? "" : nicknameDup ? "사용 가능합니다" : ""}</p>
        </div>

        <div className="flex flex-col">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            maxLength={20}
            placeholder="최소 9~20자, 영어+숫자+특수문자 조합"
            className={`auth-input ${passwordError ? "border-info-red" : passwordValid ? "border-info-green" : ""}`}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-info-red text-xs">{passwordError}</p>
          <p className="text-info-green text-xs">{passwordError ? "" : passwordValid ? "사용 가능합니다" : ""}</p>
        </div>

        <div className="flex flex-col">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            maxLength={20}
            placeholder="최소 9~20자, 영어+숫자+특수문자 조합"
            className={`auth-input ${confirmPasswordError ? "border-info-red" : confirmPasswordValid ? "border-info-green" : ""}`}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className="text-info-red text-xs">{confirmPasswordError}</p>
          <p className="text-info-green text-xs">{confirmPasswordValid ? "비밀번호와 일치합니다" : ""}</p>
        </div>

        <Button size={"large"} rounded={"medium"} onClick={handleClickSignUp}>
          회원가입 완료하기
        </Button>
      </div>
    </div>
  );
}

export default SignUpContainer;
