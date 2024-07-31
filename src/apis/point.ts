import { BASE_URL } from "@/constants";
import { TPoint } from "@/types/point.type";

export const getPointsDetail = async (userId: string): Promise<TPoint[]> => {
  const res = await fetch(`${BASE_URL}/api/points/${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch points data");
  }
  const points = await res.json();
  return points;
};
