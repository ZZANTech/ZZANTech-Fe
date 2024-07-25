import { TChat } from "@/types/chat.type";
import Image from "next/image";

type ChatMessageItemProps = {
  message: TChat;
};

const ChatMessageItem = ({ message }: ChatMessageItemProps) => {
  return (
    <div>
      {message.image_url && <Image src={message.image_url} alt="chat image" width={200} height={200} />}
      <p>{message.content}</p>
    </div>
  );
};

export default ChatMessageItem;
