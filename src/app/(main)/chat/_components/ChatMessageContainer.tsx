"use client";

import ChatMessageInput from "@/app/(main)/chat/_components/ChatMessageInput";
import ChatMessageList from "@/app/(main)/chat/_components/ChatMessageList";
import { useRealtimeChats } from "@/app/(main)/chat/_utils/useRealtimeChats";

function ChatMessageContainer({ roomId }: { roomId: number }) {
  useRealtimeChats(roomId);

  return (
    <div className="flex items-center justify-center  bg-gray-100 h-dvh ">
      <div>
        <p>지금 25명의 짠테커들이 함께 이야기를 나누고 있어요!</p>
        <div className="flex flex-col h-[60vh] bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex-grow overflow-y-auto p-4">
            <ChatMessageList roomId={roomId} />
          </div>
          <div className="p-3 bg-gray-200">
            <ChatMessageInput roomId={roomId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessageContainer;
