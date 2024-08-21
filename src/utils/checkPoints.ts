import { MAX_POINTS_PER_DAY } from "@/utils/points";
import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";

export const checkAndAddPoints = async (user_id: string, pointsToAdd: number, reason: string) => {
  const supabase = createClient();
  const today = dayjs().format("YYYY-MM-DD");

  const { data: pointsData, error: pointsError } = await supabase
    .from("points")
    .select("point")
    .eq("user_id", user_id)
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lte("created_at", `${today}T23:59:59.999Z`);

  if (pointsError) {
    throw new Error(`포인트 조회 오류: ${pointsError.message}`);
  }

  const totalPointsToday = pointsData.reduce((acc: number, curr: { point: number }) => acc + curr.point, 0);

  if (totalPointsToday + pointsToAdd > MAX_POINTS_PER_DAY) {
    throw new Error("하루 최대 포인트 획득량을 초과했습니다.");
  }

  const { error: pointError } = await supabase.from("points").insert({
    user_id,
    point: pointsToAdd,
    reason,
    created_at: new Date().toISOString()
  });

  if (pointError) {
    throw new Error(`포인트 추가 오류: ${pointError.message}`);
  }

  // 사용자 정보 업데이트
  const { error: userError } = await supabase.rpc("increment_user_points", {
    user_id,
    points_to_add: pointsToAdd
  });

  if (userError) {
    throw new Error(`사용자 포인트 업데이트 오류: ${userError.message}`);
  }
};
