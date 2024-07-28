import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/utils/supabase/server";

type RequestBody = {
  type: "checkNickname" | "changeNickname" | "changePassword";
  userId?: string;
  nickname?: string;
  oldPassword?: string;
  newPassword?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { userId, nickname, oldPassword, newPassword } = body;

  const supabase = createClient();

  if (method === "POST") {
    if (type === "checkNickname") {
      const { data, error } = await supabase.from("users").select("id").eq("nickname", nickname);

      if (error) return res.status(500).json({ error: error.message });

      if (data.length > 0) return res.status(400).json({ error: "이미 사용 중인 닉네임입니다." });

      return res.status(200).json({ message: "사용 가능한 닉네임입니다." });
    }

    if (type === "changeNickname") {
      const { error } = await supabase.from("users").update({ nickname }).eq("id", userId);

      if (error) return res.status(500).json({ error: error.message });

      return res.status(200).json({ message: "닉네임이 성공적으로 변경되었습니다." });
    }

    if (type === "changePassword") {
      // 기존 비밀번호 확인
      const { data: user, error: fetchError } = await supabase
        .from("users")
        .select("password")
        .eq("id", userId)
        .single();

      if (fetchError) return res.status(500).json({ error: fetchError.message });

      if (user.password !== oldPassword) {
        return res.status(400).json({ error: "기존 비밀번호가 일치하지 않습니다." });
      }

      const { error: updateError } = await supabase.from("users").update({ password: newPassword }).eq("id", userId);

      if (updateError) return res.status(500).json({ error: updateError.message });

      return res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
