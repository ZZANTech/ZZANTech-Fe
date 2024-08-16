import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: { giftId: string } }) => {
  const supabase = createClient();
  const giftId = params.giftId;
  const newClaim = await req.json();

  try {
    if (giftId) {
      const { data: gift, error: giftError } = await supabase
        .from("gifts")
        .select("*")
        .eq("giftId", newClaim.gift_id)
        .single();

      if (giftError) {
        throw new Error("기프티콘 데이터 패칭 실패");
      }

      const { data: user, error: userError } = await supabase
        .from("users")
        .select("current_point")
        .eq("userId", newClaim.user_id)
        .single();

      if (userError) {
        throw new Error("유저의 현재 포인트 가져오기 실패");
      }

      const currentPoint = user.current_point;
      const POINT_TO_SUBSTRACT = gift.point;
      const REASON_FOR_SUBSTRACT = `${gift.gift_name} 교환`;

      if (currentPoint < POINT_TO_SUBSTRACT) {
        return NextResponse.json({ error: "포인트가 부족합니다" }, { status: 402 });
      }

      const [claimResult, pointResult, updateUserResult] = await Promise.all([
        supabase.from("gift_claims").insert(newClaim).single(),
        supabase.from("points").insert({
          user_id: newClaim.user_id,
          point: -POINT_TO_SUBSTRACT,
          reason: REASON_FOR_SUBSTRACT,
          created_at: new Date().toISOString()
        }),
        supabase
          .from("users")
          .update({ current_point: currentPoint - POINT_TO_SUBSTRACT })
          .eq("userId", newClaim.user_id)
      ]);

      const { status, statusText, error: claimError } = claimResult;
      const { error: pointError } = pointResult;
      const { error: updateUserError } = updateUserResult;

      if (claimError) {
        throw new Error("기프티콘 교환에 실패했습니다.");
      }

      if (pointError) {
        throw new Error("포인트 기록 추가 실패");
      }

      if (updateUserError) {
        throw new Error("유저의 포인트 업데이트 실패");
      }

      revalidatePath("/", "layout");
      return NextResponse.json({ status, statusText });
    } else {
      return NextResponse.json({ error: "유효하지 않은 요청입니다" }, { status: 400 });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
