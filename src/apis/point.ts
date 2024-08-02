import { BASE_URL } from "@/constants";
import { Tables } from "@/types/supabase";

export const getPointsDetail = async (userId: Tables<"users">["userId"], page: number, limit: number) => {
  const res = await fetch(`${BASE_URL}/api/points/${userId}?page=${page}&limit=${limit}`);
  if (!res.ok) {
    throw new Error("Failed to fetch points data");
  }
  const points = await res.json();
  return points;
};
