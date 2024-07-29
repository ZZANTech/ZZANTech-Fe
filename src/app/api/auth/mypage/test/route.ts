import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * 서버에서 닉네임 중복체크까지 판단해서, 통과하면 바로 닉네임 변경해주기!
 * 1. method는 PATCH
 * 2. PATCh 안에 supabase 함수 2개
 * 2-1. 닉네임 중복체크 : filter
 *   - 변경하고자 하는 닉네임을 가져오기. req.json()
 *   - 그 닉네임이 users 테이블의 nickname 열에 있는지 판단하기. 결과는 true/false
 *      - true : 동일한 닉네임 있음 --> 유효성 불통
 *      - false : 사용 가능한 닉네임 --> 유효성 통과!!
 * 2-2. 닉네임 변경: update
 *    - 유효성 검사 통과한 닉네임으로 변경하기
 *    ==> '중복체크'에서 업데이트까지는 할 필요 없음!
 */

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  const nickname = await req.json();
  console.log("route nickname >> ", nickname);

  const { data } = await supabase.from("users").select("*").eq("nickname", nickname).single();

  console.log("route data >>", data);

  if (!data) {
    return NextResponse.json("사용 가능한 닉네임입니다.");
  }

  if (data) {
    return NextResponse.json({ error: "동일한 닉네임이 있습니다." }, { status: 409 });
  }

  return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
};
