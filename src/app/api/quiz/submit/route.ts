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
    const { data: existingAnswer, error: checkError } = await supabase
      .from("answers")
      .select("answerId")
      .eq("user_id", user_id)
      .eq("quiz_id", quiz_id)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      return NextResponse.json({ error: "퀴즈 중복 제출이 감지되었습니다." }, { status: 400 });
    }

    if (existingAnswer) {
      return NextResponse.json({ error: "이미 이 퀴즈에 대한 답변이 존재합니다." }, { status: 400 });
    }

    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .select("is_correct, explanation")
      .eq("quizId", quiz_id)
      .single();

    if (quizError || !quizData) {
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
      return NextResponse.json({ error: "답변을 저장하는 도중 문제가 발생했습니다." }, { status: 500 });
    }

    const points = isCorrect ? POINTS.QUIZ_CORRECT : POINTS.QUIZ_PARTICIPATION;
    const reason = isCorrect ? REASONS.QUIZ_CORRECT : REASONS.QUIZ_PARTICIPATION;

    await addPoints(user_id, points, reason);

    return NextResponse.json({ isCorrect, explanation: quizData.explanation });
  } catch (err) {
    return NextResponse.json({ error: "서버에 문제가 발생했습니다." }, { status: 500 });
  }
};
