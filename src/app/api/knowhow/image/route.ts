import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  try {
    const formData = await req.formData();
    const file = formData.get("profile") as File;

    if (!file) {
      return NextResponse.json({ error: "파일이 업로드되지 않았어요." }, { status: 400 });
    }
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "파일의 최대크기는 10MB입니다." }, { status: 400 });
    }

    const fileName = `${crypto.randomUUID()}.png`;

    const { data, error } = await supabase.storage.from("knowhow_image").upload(`quill_image/${fileName}`, file);

    if (error) {
      console.log("Upload error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Upload successful:", data);

    const { data: publicURL } = supabase.storage.from("knowhow_image").getPublicUrl(`quill_image/${fileName}`);

    console.log("이거는 퍼블릭유알엘", publicURL.publicUrl);

    return NextResponse.json({ url: publicURL.publicUrl }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Unexpected error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.log("Unexpected error:", String(error));
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
