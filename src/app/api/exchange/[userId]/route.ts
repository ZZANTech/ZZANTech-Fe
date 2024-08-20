import { createClient } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  const supabase = createClient();
  const userId = params.userId;
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  try {
    const {
      data: giftClaims,
      count,
      error
    } = await supabase
      .from("gift_claims")
      .select("*, gifts(gift_name)", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error("기프티콘 신청 내역을 가져오지 못했습니다");
    }

    const transformedGiftClaims =
      giftClaims?.map((claim) => {
        const { gifts, ...rest } = claim;
        return {
          ...rest,
          gift_name: gifts?.gift_name
        };
      }) || [];

    return NextResponse.json({
      data: transformedGiftClaims,
      totalCount: count || 0
    });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
