"use client";

import ChatMessageItem from "@/app/(main)/chat/_components/ChatMessageItem";
import { useChatMessagesQuery } from "@/stores/queries/useChatMessagesQuery";
import { TChatWithUser } from "@/types/chat.type";

type ChatMessageListProps = {
  roomId: number;
};

function ChatMessageList({ roomId }: ChatMessageListProps) {
  const { data: chats, isPending } = useChatMessagesQuery(roomId);

  if (isPending) {
    return <div>loading</div>;
  }

  return (
    <div>{chats?.map((message: TChatWithUser) => <ChatMessageItem key={message.chatId} message={message} />)}</div>
  );
}

export default ChatMessageList;
