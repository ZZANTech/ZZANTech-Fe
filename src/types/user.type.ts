import { Tables } from "@/types/supabase";

export type TUser = Tables<"users">;

export type TUserInsert = Omit<
  TUser,
  "created_at" | "updated_at" | "userId" | "badge_url" | "current_point" | "total_point" | "provider"
> & {
  password: string;
  confirmPassword: string;
};

export type TUserUpdate = Partial<TUser>;
