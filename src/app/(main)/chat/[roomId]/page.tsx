import { fetchChatRooms } from "@/apis/chat";
import ChatMessageContainer from "@/app/(main)/chat/_components/ChatMessageContainer";

async function ChatRoomPage({ params }: { params: { roomId: string } }) {
  const roomId = parseInt(params.roomId, 10);
  const roomInfo = await fetchChatRooms();

  return (
    <div>
      <h1>{roomInfo.room_name}</h1>
      <ChatMessageContainer roomId={roomId} />
    </div>
  );
}

export default ChatRoomPage;
