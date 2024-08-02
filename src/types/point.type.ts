import { Tables } from "@/types/supabase";

export type TPointResponse = {
  data: TPoint[];
  totalCount: number;
};

export type TPoint = Tables<"points">;
