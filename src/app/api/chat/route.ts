import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  if (!roomId) {
    return NextResponse.json({ error: "roomId가 필요합니다." }, { status: 400 });
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("chats")
    .select("*, users(nickname)")
    .eq("room_id", parseInt(roomId, 10))
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  const supabase = createClient();
  const { room_id, content, image_url, user_id } = await req.json();

  // 방이 존재하는지 확인
  const { data: roomData, error: roomError } = await supabase
    .from("chat_rooms")
    .select("roomId")
    .eq("roomId", room_id)
    .single();

  if (roomError || !roomData) {
    return NextResponse.json({ error: "채팅방이 존재하지 않습니다." }, { status: 404 });
  }

  const { data, error } = await supabase.from("chats").insert({
    content,
    image_url,
    room_id,
    user_id,
    created_at: new Date().toISOString()
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};
