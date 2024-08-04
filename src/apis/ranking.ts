import { BASE_URL } from "@/constants";

export const getRanking = async () => {
  const res = await fetch(`${BASE_URL}/api/ranking`);
  const rankings = await res.json();
  return rankings;
};
