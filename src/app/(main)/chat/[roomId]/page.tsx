import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchChatRooms, fetchInitialChats } from "@/apis/chat";
import ChatMessageContainer from "../_components/ChatMessageContainer";

async function ChatRoomPage({ params }: { params: { roomId: string } }) {
  const roomId = parseInt(params.roomId, 10);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["chats", roomId],
    queryFn: () => fetchInitialChats(roomId)
  });

  const roomInfo = await fetchChatRooms();
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <h1>{roomInfo.room_name}</h1>
      <ChatMessageContainer roomId={roomId} />
    </HydrationBoundary>
  );
}

export default ChatRoomPage;
