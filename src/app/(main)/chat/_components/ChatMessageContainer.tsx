"use client";

import ChatMessageInput from "@/app/(main)/chat/_components/ChatMessageInput";
import ChatMessageList from "@/app/(main)/chat/_components/ChatMessageList";
import { useRealtimeChats } from "@/app/(main)/chat/_utils/useRealtimeChats";
import Image from "next/image";

function ChatMessageContainer({ roomId }: { roomId: number }) {
  useRealtimeChats(roomId);

  return (
    <div className="flex items-center justify-center h-dvh">
      <div>
        <Image src="/icons/chat/chatRoomBanner.svg" alt="banner" width={768} height={200} className="mb-3" />
        <div className="flex flex-col max-h-[600px] bg-white shadow-lg rounded-lg overflow-hidden">
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
