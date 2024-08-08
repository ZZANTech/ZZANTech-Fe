import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { addPoints, POINTS, REASONS } from "@/utils/points";

export const POST = async (req: Request) => {
  const supabase = createClient();
  const { quiz_id, answer } = await req.json();

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const user_id = user.id;

  try {
    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .select("is_correct, explanation")
      .eq("quizId", quiz_id)
      .single();

    if (quizError || !quizData) {
      console.error("퀴즈를 가져오는 도중 오류 발생:", quizError?.message);
      return NextResponse.json({ error: "퀴즈를 찾을 수 없습니다." }, { status: 404 });
    }

    const isCorrect = answer === quizData.is_correct;

    const { error: answerError } = await supabase.from("answers").insert({
      user_id,
      quiz_id,
      answer,
      created_at: new Date().toISOString()
    });

    if (answerError) {
      console.error("답변 저장 도중 오류 발생:", answerError.message);
      return NextResponse.json({ error: "답변을 저장하는 도중 문제가 발생했습니다." }, { status: 500 });
    }

    const points = isCorrect ? POINTS.QUIZ_CORRECT : POINTS.QUIZ_PARTICIPATION;
    const reason = isCorrect ? REASONS.QUIZ_CORRECT : REASONS.QUIZ_PARTICIPATION;

    await addPoints(user_id, points, reason);

    return NextResponse.json({ isCorrect, explanation: quizData.explanation });
  } catch (err) {
    console.error("예상치 못한 오류 발생:", err);
    return NextResponse.json({ error: "서버에 문제가 발생했습니다." }, { status: 500 });
  }
};
