"use client";

import ChatMessageItem from "@/app/(main)/chat/_components/ChatMessageItem";
import FlyingTikkle from "@/components/Loading/FlyingTikkle";
import { useChatMessagesQuery } from "@/stores/queries/chat/useChatMessagesQuery";
import { TChatWithUser } from "@/types/chat.type";
import { useEffect, useRef, useState } from "react";

type ChatMessageListProps = {
  roomId: number;
};
const TIME_THRESHOLD = 60 * 1000;

function ChatMessageList({ roomId }: ChatMessageListProps) {
  const { data: chats, isPending } = useChatMessagesQuery(roomId);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const isAtBottom =
        scrollRef.current.scrollTop + scrollRef.current.clientHeight >= scrollRef.current.scrollHeight - 50;
      setIsAutoScroll(isAtBottom);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (isAutoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chats]);

  if (isPending) {
    return <FlyingTikkle />;
  }

  return (
    <div ref={scrollRef} className="flex flex-col h-full overflow-y-auto relative">
      <div className="flex-grow">
        {chats?.map((message: TChatWithUser, index: number) => {
          const prevMessage = chats[index - 1];
          const nextMessage = chats[index + 1];
          const showNickname =
            !prevMessage ||
            prevMessage.user_id !== message.user_id ||
            new Date(message.created_at).getTime() - new Date(prevMessage.created_at).getTime() > TIME_THRESHOLD;
          const showTime =
            !nextMessage ||
            nextMessage.user_id !== message.user_id ||
            new Date(nextMessage.created_at).getTime() - new Date(message.created_at).getTime() > TIME_THRESHOLD;
          return (
            <ChatMessageItem key={message.chatId} message={message} showNickname={showNickname} showTime={showTime} />
          );
        })}
      </div>
    </div>
  );
}

export default ChatMessageList;
