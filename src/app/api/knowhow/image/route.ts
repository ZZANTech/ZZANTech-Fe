import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  try {
    const formData = await req.formData();
    const files = formData.getAll("img") as File[];

    if (!files.length) {
      throw new Error("파일이 첨부되지 않았습니다.");
    }

    const MAX_SIZE = 10 * 1024 * 1024;
    for (const file of files) {
      if (file.size > MAX_SIZE) {
        throw new Error("파일의 최대 크기는 10MB입니다.");
      }
    }

    const urls = await Promise.all(
      files.map(async (file) => {
        const fileName = `${crypto.randomUUID()}.png`;
        const { data, error } = await supabase.storage.from("knowhow_image").upload(`quill_image/${fileName}`, file);

        if (error) {
          throw new Error(error.message);
        }

        const { data: publicURL } = supabase.storage.from("knowhow_image").getPublicUrl(`quill_image/${fileName}`);

        return publicURL;
      })
    );
    return NextResponse.json(urls);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
    }
  }
}
