import { Tables } from "@/types/supabase";

export type TPointsResponse = {
  data: TPoint[];
};

export type TPoint = Tables<"points">;
