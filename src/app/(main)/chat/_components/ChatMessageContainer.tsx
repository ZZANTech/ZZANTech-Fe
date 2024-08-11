"use client";

import ChatMessageInput from "@/app/(main)/chat/_components/ChatMessageInput";
import ChatMessageList from "@/app/(main)/chat/_components/ChatMessageList";
import { useRealtimeChats } from "@/app/(main)/chat/_utils/useRealtimeChats";
import Image from "next/image";

function ChatMessageContainer({ roomId }: { roomId: number }) {
  useRealtimeChats(roomId);

  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100dvh-400px)] p-4">
      <div className="w-full max-w-[630px]">
        <Image src="/icons/chat/chatRoomBanner.svg" alt="banner" width={630} height={200} className="mb-3" />
        <div className="flex flex-col h-[50vh] sm:h-[60vh] bg-white shadow-lg rounded-lg overflow-hidden">
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
