import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.rpc("get_votes_with_counts_and_nickname");

    if (error) {
      throw new Error("게시글을 불러오지 못했습니다.");
    }

    return NextResponse.json({ data });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

export const POST = async (req: Request) => {
  const supabase = createClient();
  const newVote = await req.json();

  try {
    const { status, statusText } = await supabase.from("vote_posts").insert(newVote).single();
    return NextResponse.json({ status, statusText });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
