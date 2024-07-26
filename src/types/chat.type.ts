import { Tables } from "./supabase";

export type TChat = Tables<"chats">;

export type TUploadResponse = { url: string };

export type TMessageResponse = TChat;
