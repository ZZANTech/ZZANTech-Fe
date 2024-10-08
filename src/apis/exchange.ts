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

export const getClaims = async (currentPage: number, itemsPerPage: number, userId: Tables<"users">["userId"]) => {
  const res = await fetch(`${BASE_URL}/api/exchange/${userId}?page=${currentPage}&limit=${itemsPerPage}`, {
    cache: "no-store"
  });
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
    throw { message: errorMessage, status: res.status };
  }
  const gifts = await res.json();
  return gifts;
};
