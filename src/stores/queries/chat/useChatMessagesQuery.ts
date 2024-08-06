import { useQuery } from "@tanstack/react-query";
import { fetchInitialChats } from "@/apis/chat";
import { TChatWithUser } from "@/types/chat.type";

export const useChatMessagesQuery = (roomId: number) => {
  return useQuery<TChatWithUser[], Error>({
    queryKey: ["chats", roomId],
    queryFn: () => fetchInitialChats(roomId)
  });
};
