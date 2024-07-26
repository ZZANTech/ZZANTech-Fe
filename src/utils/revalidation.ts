"use server";
import { revalidatePath } from "next/cache";

export const revalidated = async (path: string, type: "page" | "layout") => {
  revalidatePath(path, type);
};
