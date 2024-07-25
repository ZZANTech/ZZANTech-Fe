"use client";

import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";
import { useRealtimeChats } from "../_utils/useRealtimeChats";

function ChatMessageContainer({ roomId }: { roomId: number }) {
  useRealtimeChats(roomId);

  return (
    <div>
      <ChatMessageList roomId={roomId} />
      <ChatMessageInput roomId={roomId} />
    </div>
  );
}

export default ChatMessageContainer;
