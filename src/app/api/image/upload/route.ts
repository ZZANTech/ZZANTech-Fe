import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const encodeFileName = (fileName: string): string => Buffer.from(fileName).toString("base64");

// 파일 업로드 함수
const uploadFileToSupabase = async (
  supabase: ReturnType<typeof createClient>,
  bucketName: string,
  fileName: string,
  file: File
) => {
  const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file);
  if (error) throw new Error(error.message);
  return data;
};

// URL 가져오기 함수
const getPublicUrl = async (supabase: ReturnType<typeof createClient>, bucketName: string, fileName: string) => {
  const { data } = await supabase.storage.from(bucketName).getPublicUrl(fileName);
  if (!data || !data.publicUrl) throw new Error("이미지 URL을 가져올 수 없습니다.");
  return data.publicUrl;
};

export const POST = async (req: Request) => {
  try {
    const supabase = createClient();
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const bucketName = formData.get("bucket") as string;

    if (!file) {
      return NextResponse.json({ error: "파일이 필요합니다." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "파일 크기가 너무 큽니다. 최대 5MB까지 허용됩니다." }, { status: 400 });
    }

    const fileName = `${crypto.randomUUID()}-${encodeFileName(file.name)}`;

    await uploadFileToSupabase(supabase, bucketName, fileName, file);
    const publicUrl = await getPublicUrl(supabase, bucketName, fileName);

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 에러입니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
