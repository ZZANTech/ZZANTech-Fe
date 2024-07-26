"use client";

import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";
import { useRealtimeChats } from "../_utils/useRealtimeChats";

function ChatMessageContainer({ roomId }: { roomId: number }) {
  useRealtimeChats(roomId);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col h-[60vh] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex-grow overflow-y-auto p-4">
          <ChatMessageList roomId={roomId} />
        </div>
        <div className="p-4 bg-gray-200">
          <ChatMessageInput roomId={roomId} />
        </div>
      </div>
    </div>
  );
}

export default ChatMessageContainer;
