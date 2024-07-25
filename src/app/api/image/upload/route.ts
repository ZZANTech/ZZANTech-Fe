import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const POST = async (req: Request) => {
  const supabase = createClient();
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "파일이 필요합니다." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "파일 크기가 너무 큽니다. 최대 5MB까지 허용됩니다." }, { status: 400 });
    }

    const fileName = `${crypto.randomUUID()}-${file.name}`;
    const { data, error } = await supabase.storage.from("chat_image").upload(fileName, file);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: publicData } = supabase.storage.from("chat_image").getPublicUrl(fileName);

    if (!publicData || !publicData.publicUrl) {
      return NextResponse.json({ error: "이미지 URL을 가져올 수 없습니다." }, { status: 500 });
    }

    return NextResponse.json({ url: publicData.publicUrl });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러입니다." }, { status: 500 });
    }
  }
};
