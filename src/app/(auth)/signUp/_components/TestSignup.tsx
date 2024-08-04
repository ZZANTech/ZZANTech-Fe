"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function TestSignup() {
  const [email, setEmail] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const [nickname, setNickname] = useState<string>("");
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [recheckedPassword, setRecheckedPassword] = useState<string>("");
  const [recheckedPasswordMessage, setRecheckedPasswordMessage] = useState<string>("");
  const [recheckedPasswordError, setRecheckedPasswordError] = useState<string>("");

  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleEmail = () => {};
  useEffect(() => {}, [email]);

  const handleNickname = () => {};
  useEffect(() => {}, [nickname]);

  const handlePassword = () => {};
  useEffect(() => {}, [password]);

  const handleRecheckedPassword = () => {};
  useEffect(() => {}, [recheckedPassword]);

  const handleAgreement = () => {};
  useEffect(() => {}, []);

  return (
    <div>
      {/*이메일 */}
      <section></section>
      {/*닉네임 */}
      <section></section>
      {/*비밀번호 */}
      <section></section>
      {/*비밀번호 확인 */}
      <section></section>
      {/*전체약관 */}
      <section></section>
    </div>
  );
}

export default TestSignup;
