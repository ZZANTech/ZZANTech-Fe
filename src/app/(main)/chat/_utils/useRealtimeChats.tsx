"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TChatWithUser } from "@/types/chat.type";
import { createClient } from "@/utils/supabase/client";

export const useRealtimeChats = (roomId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = createClient();

    const handleInserts = async (payload: any) => {
      const newMessage = payload.new;

      const { data: user, error } = await supabase
        .from("users")
        .select("nickname")
        .eq("userId", newMessage.user_id)
        .single();

      if (error) {
        console.error("Failed to fetch user nickname:", error);
        return;
      }

      const messageWithNickname: TChatWithUser = {
        ...newMessage,
        users: {
          nickname: user.nickname
        }
      };

      queryClient.setQueryData<TChatWithUser[]>(["chats", roomId], (prev) => [...(prev || []), messageWithNickname]);
    };

    const channel = supabase
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
