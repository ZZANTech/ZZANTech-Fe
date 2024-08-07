import { useQuery } from "@tanstack/react-query";
import { fetchChatRooms } from "@/apis/chat";
import { TChatRoom } from "@/types/chatRoom.type";

export const useChatRoomsQuery = () => {
  return useQuery<TChatRoom[], Error>({
    queryKey: ["chatRooms"],
    queryFn: () => fetchChatRooms()
  });
};
