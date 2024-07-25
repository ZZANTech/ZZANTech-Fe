import { useQuery } from "@tanstack/react-query";
import { fetchInitialChats } from "@/apis/chat";
import { TChat } from "@/types/chat.type";

export const useChatMessagesQuery = (roomId: number) => {
  return useQuery<TChat[], Error>({
    queryKey: ["chats", roomId],
    queryFn: () => fetchInitialChats(roomId)
  });
};
