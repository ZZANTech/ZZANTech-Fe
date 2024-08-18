"use client";

import ChatMessageInput from "@/app/(main)/chat/_components/ChatMessageInput";
import ChatMessageList from "@/app/(main)/chat/_components/ChatMessageList";
import { useRealtimeChats } from "@/app/(main)/chat/_utils/useRealtimeChats";
import Image from "next/image";

function ChatMessageContainer({ roomId }: { roomId: number }) {
  useRealtimeChats(roomId);

  return (
    <div className="flex items-center justify-center w-dvh h-[calc(100vh-70px)]">
      <div className="w-full max-w-[630px] flex flex-col h-full">
        <div className="relative mb-3 w-full h-full max-h-[100px]">
          <Image src="/icons/chat/chatRoomBanner.png" alt="banner" fill sizes="100vw" className="rounded-lg" />
          <div className="absolute inset-0 flex flex-col items-center justify-center py-2">
            <h3 className="text-lg text-white font-semibold">살까 말까? LIVE</h3>
            <p className="text-sm text-black">실시간으로 대화가 진행되고 있어요!</p>
            <p className="text-sm text-black">소비와 관련된 대화를 나누어 주세요</p>
          </div>
        </div>
        <div className="flex flex-col lg:h-[70dvh] bg-white rounded-lg overflow-hidden">
          <div className="flex-grow overflow-y-auto p-1">
            <ChatMessageList roomId={roomId} />
          </div>
          <div className="p-2 bg-gray-200">
            <ChatMessageInput roomId={roomId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessageContainer;
