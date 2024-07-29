"use client";

import ChatMessageItem from "@/app/(main)/chat/_components/ChatMessageItem";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useChatMessagesQuery } from "@/stores/queries/useChatMessagesQuery";
import { TChatWithUser } from "@/types/chat.type";

type ChatMessageListProps = {
  roomId: number;
};
const TIME_THRESHOLD = 60 * 1000;

function ChatMessageList({ roomId }: ChatMessageListProps) {
  const { data: chats, isPending } = useChatMessagesQuery(roomId);

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {chats?.map((message: TChatWithUser, index: number) => {
        const prevMessage = chats[index - 1];
        const showNickname =
          !prevMessage ||
          prevMessage.user_id !== message.user_id ||
          new Date(message.created_at).getTime() - new Date(prevMessage.created_at).getTime() > TIME_THRESHOLD;

        return <ChatMessageItem key={message.chatId} message={message} showNickname={showNickname} />;
      })}
    </div>
  );
}

export default ChatMessageList;
