"use client";

import { resetPassword } from "@/apis/auth";
import { useState } from "react";

function TestPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    if (!email) {
      setError("빈칸을 입력해주세요. ");
      setLoading(false);
      return;
    }

    const data = resetPassword(email);
    console.log("TestPassword >>", data);
    setLoading(false);
  };

  return (
    <div>
      <h1>비밀번호 재설정 링크 보내는 이메일</h1>
      <input type="email" placeholder="이메일을 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleResetPassword} disabled={loading}>
        {loading ? "보내는 중..." : "재설정 링크 보내기"}
      </button>

      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default TestPassword;
