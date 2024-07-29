import { useUserContext } from "@/provider/contexts/UserContext";
import { TChatWithUser } from "@/types/chat.type";
import Image from "next/image";

type ChatMessageItemProps = {
  message: TChatWithUser;
  showNickname: boolean;
};

function ChatMessageItem({ message, showNickname }: ChatMessageItemProps) {
  const { user } = useUserContext();
  const isCurrentUser = user?.userId === message.user_id;

  const getDisplayNickname = (nickname: string | undefined) => {
    if (!nickname) return "";
    return nickname.length > 12 ? `${nickname.slice(0, 12)}...` : nickname;
  };
  return (
    <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} mb-2`}>
      {!isCurrentUser && showNickname && (
        <p className="leading-6 text-[#9500DC] mb-1">{getDisplayNickname(message.users?.nickname)}</p>
      )}
      <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} items-end`}>
        {isCurrentUser && (
          <div className="text-xs text-gray-500 mr-2">{new Date(message.created_at).toLocaleTimeString()}</div>
        )}
        <div
          className={`max-w-xs px-5 py-2 flex items-center gap-2 ${
            isCurrentUser
              ? "bg-main rounded-bl-[28px] rounded-br-[28px] rounded-tl-[28px]"
              : "bg-[#EEE2FA] rounded-br-[28px] rounded-bl-[28px] rounded-tr-[28px]"
          } relative`}
        >
          <div className={`text-sm ${isCurrentUser ? "text-right" : "text-left"}`}>
            {message.image_url && <Image src={message.image_url} alt="chat image" width={100} height={100} />}
            <p className="break-all">{message.content}</p>
          </div>
        </div>
        {!isCurrentUser && (
          <div className="text-xs text-gray-500 ml-2">{new Date(message.created_at).toLocaleTimeString()}</div>
        )}
      </div>
    </div>
  );
}

export default ChatMessageItem;
