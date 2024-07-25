"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TChat } from "@/types/chat.type";
import { createClient } from "@/utils/supabase/client";

export const useRealtimeChats = (roomId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleInserts = (payload: any) => {
      queryClient.setQueryData<TChat[]>(["chats", roomId], (prev) => [...(prev || []), payload.new]);
    };

    const channel = createClient()
      .channel(`chat_${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chats",
          filter: `room_id=eq.${roomId}`
        },
        handleInserts
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [roomId, queryClient]);
};
