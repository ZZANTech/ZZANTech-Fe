import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  const isBlocked: true | null = data.user?.user_metadata.is_blocked;
  if (isBlocked) {
    if (isBlocked) {
      await supabase.auth.signOut();
      return NextResponse.json({ error: "로그인이 제한된 사용자입니다" }, { status: 403 });
    }
  }
  if (!data) return NextResponse.json("", { status: 401 });
  else {
    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("userId", data.user?.id as string)
      .single();

    if (error) {
      console.error(error);
    }
    if (users) {
      revalidatePath("/", "layout");
      return NextResponse.json({ users });
    }
  }

  return NextResponse.json({ error: "유저가 없어요 getUSer" });
}
