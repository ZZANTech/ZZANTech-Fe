import { Tables } from "@/types/supabase";
export type TClaim = Tables<"gift_claims"> & {
  gift_name: string;
};
