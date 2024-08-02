import { BASE_URL } from "@/constants";
import { Tables } from "@/types/supabase";

export const getGifts = async () => {
  const res = await fetch(`${BASE_URL}/api/exchange/gift`);
  if (!res.ok) {
    throw new Error();
  }
  const gifts = await res.json();
  return gifts;
};

export const getClaims = async (userId: Tables<"users">["userId"]) => {
  const res = await fetch(`${BASE_URL}/api/exchange/${userId}`, { cache: "no-store" });
  console.log(res);
  if (!res.ok) {
    throw new Error();
  }
  const gifts = await res.json();
  return gifts;
};

export const postClaim = async (newClaim: Partial<Tables<"gift_claims">>) => {
  const res = await fetch(`${BASE_URL}/api/exchange/claim/${newClaim.gift_id}`, {
    method: "POST",
    body: JSON.stringify(newClaim)
  });
  if (!res.ok) {
    const errorData = await res.json();

    const errorMessage = errorData.error;
    throw new Error(errorMessage);
  }
  const gifts = await res.json();
  return gifts;
};
