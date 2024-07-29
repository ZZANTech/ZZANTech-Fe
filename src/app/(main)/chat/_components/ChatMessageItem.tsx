import { useUserContext } from "@/provider/contexts/UserContext";
import { TChatWithUser } from "@/types/chat.type";
import Image from "next/image";

type ChatMessageItemProps = {
  message: TChatWithUser;
};

function ChatMessageItem({ message }: ChatMessageItemProps) {
  const { user } = useUserContext();
  const isCurrentUser = user?.userId === message.user_id;

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2 items-end`}>
      {isCurrentUser && (
        <div className="text-xs text-gray-500 mr-2">{new Date(message.created_at).toLocaleTimeString()}</div>
      )}
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${isCurrentUser ? "bg-main text-black" : "bg-[#EEE2FA] text-black"} relative`}
      >
        <div className={`text-sm ${isCurrentUser ? "text-right" : "text-left"}`}>
          {!isCurrentUser && <p className="text-purple-500">{message.users?.nickname}</p>}
          {message.image_url && <Image src={message.image_url} alt="chat image" width={100} height={100} />}
          <p className="break-words">{message.content}</p>
        </div>
      </div>
      {!isCurrentUser && (
        <div className="text-xs text-gray-500 ml-2">{new Date(message.created_at).toLocaleTimeString()}</div>
      )}
    </div>
  );
}

export default ChatMessageItem;
