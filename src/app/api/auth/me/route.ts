import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

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
