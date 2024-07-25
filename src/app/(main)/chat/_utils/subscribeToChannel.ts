import { createClient } from "@/utils/supabase/client";

export const subscribeToChannel = (handleInserts: () => void) => () => {
  const channel = createClient()
    .channel("chat")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "channel_user" }, handleInserts)
    .subscribe();

  return () => {
    channel.unsubscribe();
  };
};
