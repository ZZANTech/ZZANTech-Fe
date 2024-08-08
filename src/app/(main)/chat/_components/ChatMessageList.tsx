"use client";

import ChatMessageItem from "@/app/(main)/chat/_components/ChatMessageItem";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useChatMessagesQuery } from "@/stores/queries/chat/useChatMessagesQuery";
import { TChatWithUser } from "@/types/chat.type";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

type ChatMessageListProps = {
  roomId: number;
};

const TIME_THRESHOLD = 60 * 1000;

function ChatMessageList({ roomId }: ChatMessageListProps) {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useChatMessagesQuery(roomId);
  const { ref: topRef, inView: inViewTop } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const atBottom =
        scrollRef.current.scrollHeight - scrollRef.current.scrollTop <= scrollRef.current.clientHeight + 50;
      setIsAtBottom(atBottom);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // 스크롤 상단에 도달했을 때 페이지 페칭
  useEffect(() => {
    if (inViewTop && hasNextPage && !isFetchingNextPage) {
      const previousScrollHeight = scrollRef.current?.scrollHeight ?? 0;
      fetchNextPage().then(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight - previousScrollHeight;
        }
      });
    }
  }, [inViewTop, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 새로운 메시지 도착 시 하단으로 스크롤
  useEffect(() => {
    if (isAtBottom && data) {
      scrollToBottom();
    }
  }, [data, isAtBottom]);

  // 컴포넌트가 마운트될 때 스크롤을 맨 아래로 이동하고, 스크롤 이벤트 핸들러 추가
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollToBottom();
      scrollElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  if (!data && isFetchingNextPage) {
    return <LoadingSpinner />;
  }

  return (
    <div ref={scrollRef} className="flex flex-col h-full overflow-y-auto relative">
      <div ref={topRef} className="h-1" />
      {isFetchingNextPage && <LoadingSpinner />}
      <div className="flex-grow">
        {data?.pages.flat().map((message: TChatWithUser, index: number) => {
          const prevMessage = data.pages.flat()[index - 1];
          const showNickname =
            !prevMessage ||
            prevMessage.user_id !== message.user_id ||
            new Date(message.created_at).getTime() - new Date(prevMessage.created_at).getTime() > TIME_THRESHOLD;

          return <ChatMessageItem key={message.chatId} message={message} showNickname={showNickname} />;
        })}
      </div>
    </div>
  );
}

export default ChatMessageList;
