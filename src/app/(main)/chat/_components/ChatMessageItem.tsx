import { useUserContext } from "@/provider/contexts/userContext";
import { TChatWithUser } from "@/types/chat.type";
import Image from "next/image";

type ChatMessageItemProps = {
  message: TChatWithUser;
};

function ChatMessageItem({ message }: ChatMessageItemProps) {
  const { user } = useUserContext();
  const isCurrentUser = user?.userId === message.user_id;

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${isCurrentUser ? "bg-[#E1FF01] text-black" : "bg-purple-100 text-black"}`}
      >
        <div className={`text-sm ${isCurrentUser ? "text-right" : "text-left"}`}>
          {!isCurrentUser && <p className="text-purple-500">{message.users?.nickname}</p>}
          {message.image_url && <Image src={message.image_url} alt="chat image" width={200} height={200} />}
          <p>{message.content}</p>
          <p className="text-xs text-gray-500">{new Date(message.created_at).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessageItem;
