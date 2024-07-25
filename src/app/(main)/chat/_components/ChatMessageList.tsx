"use client";

import { useChatMessagesQuery } from "@/stores/queries/useChatMessagesQuery";
import { TChat } from "@/types/chat.type";
import ChatMessageItem from "./ChatMessageItem";

type ChatMessageListProps = {
  roomId: number;
};

function ChatMessageList({ roomId }: ChatMessageListProps) {
  const { data: chats, isPending } = useChatMessagesQuery(roomId);

  if (isPending) {
    return <div>loading</div>;
  }

  return <div>{chats?.map((message: TChat) => <ChatMessageItem key={message.chatId} message={message} />)}</div>;
}

export default ChatMessageList;
