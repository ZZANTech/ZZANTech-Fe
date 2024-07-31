import { BASE_URL } from "@/constants";
import { TPointsResponse } from "@/types/point.type";

export const getPointsDetail = async (userId: string): Promise<TPointsResponse> => {
  const res = await fetch(`${BASE_URL}/api/points/${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch points data");
  }
  const vote = await res.json();
  return vote;
};
