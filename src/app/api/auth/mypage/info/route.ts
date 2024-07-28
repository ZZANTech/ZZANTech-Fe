// import { NextApiRequest, NextApiResponse } from "next";
// import { createClient } from "@/utils/supabase/server";
// import { NextRequest, NextResponse } from "next/server";

// type RequestBody = {
//   type: "checkNickname" | "changeNickname" | "changePassword";
//   userId?: string;
//   nickname?: string;
//   oldPassword?: string;
//   newPassword?: string;
// };

// const POST = async (req: NextApiRequest, res: NextApiResponse) => {
//   // if (req.method !== "POST") {
//   //   return res.status(405).json({ error: "Method not allowed" });
//   // }

//   const { type, userId, nickname, oldPassword, newPassword }: RequestBody = req.body;

//   // const supabase = createClient();

//   try {
//     switch (type) {
//       // 닉네임 중복 확인
//       case "checkNickname": {
//         if (!nickname) {
//           return res.status(400).json({ error: "닉네임이 필요합니다." });
//         }

//         const { data, error } = await supabase.from("users").select("*").eq("nickname", nickname);

//         if (error) {
//           throw error;
//         }

//         if (data.length > 0) {
//           return res.status(400).json({ error: "이미 사용 중인 닉네임입니다." });
//         }

//         return res.status(200).json({ message: "사용 가능한 닉네임입니다." });
//       }

//       // 닉네임 변경
//       case "changeNickname": {
//         if (!userId || !nickname) {
//           return res.status(400).json({ error: "UserId and Nickname are required" });
//         }

//         const { error } = await supabase.from("users").update({ nickname }).eq("id", userId);

//         if (error) {
//           throw error;
//         }

//         return res.status(200).json({ message: "닉네임이 성공적으로 변경되었습니다." });
//       }

//       // 비밀번호 변경
//       case "changePassword": {
//         if (!userId || !oldPassword || !newPassword) {
//           return res.status(400).json({ error: "UserId, OldPassword, and NewPassword are required" });
//         }

//         const { data: user, error: fetchError } = await supabase
//           .from("users")
//           .select("password")
//           .eq("id", userId)
//           .single();

//         if (fetchError) {
//           throw fetchError;
//         }

//         if (user.password !== oldPassword) {
//           return res.status(400).json({ error: "기존 비밀번호가 일치하지 않습니다." });
//         }

//         const { error: updateError } = await supabase.from("users").update({ password: newPassword }).eq("id", userId);

//         if (updateError) {
//           throw updateError;
//         }

//         return res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
//       }

//       default:
//         return res.status(400).json({ error: "원하는 요청 타입이 없습니다." });
//     }
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// export default POST;
