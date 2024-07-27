"use server";
import { revalidatePath } from "next/cache";

export const revalidateRoute = async (path: string, type: "page" | "layout") => {
  revalidatePath(path, type);
};
