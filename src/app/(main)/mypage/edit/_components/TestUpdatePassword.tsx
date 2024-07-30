"use client";

import { updatePassword } from "@/apis/auth";
import { useState } from "react";

function TestUpdatePassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    // setLoading(true);
    setError("");
    setMessage("");

    if (!password) {
      setError("빈 칸을 입력해주세요.");
      setLoading(false);
      return;
    }

    const data = await updatePassword(password);
    console.log("TestUpdatePassword >>", data);

    setLoading(false);
  };

  return (
    <div>
      <h1>새 비밀번호</h1>
      <input
        type="password"
        placeholder="새로운 비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleUpdatePassword}>{loading ? "보내는 중..." : "비밀번호 변경하기"}</button>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default TestUpdatePassword;
