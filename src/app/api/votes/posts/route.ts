import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const supabase = createClient();
  const url = new URL(req.url);
  const sortOrder = url.searchParams.get("sortOrder") || "latest";
  const page = parseInt(url.searchParams.get("page") || "0");
  const voteId = url.searchParams.get("voteId");
  const isMobile = url.searchParams.get("isMobile") === "true";

  const pageSize = isMobile ? 3 : 12;

  let sortBy = "created_at";
  let order = "desc";

  if (sortOrder === "votes") {
    sortBy = "votes_count";
  }

  try {
    const { data, error } = await supabase
      .rpc("get_votes", { sort_by: sortBy, sort_order: order })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
      console.log(error);
      throw new Error("게시글을 불러오지 못했습니다.");
    }

    const nextPage = data.length < pageSize ? null : page + 1;

    return NextResponse.json({ data, nextPage });
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
