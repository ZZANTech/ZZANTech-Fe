import { Tables } from "@/types/supabase";

export type TChat = Tables<"chats">;

export type TUploadResponse = { url: string };

export type TMessageResponse = TChat;
