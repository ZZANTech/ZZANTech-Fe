import { useUserContext } from "@/provider/contexts/UserContext";
import { TChatWithUser } from "@/types/chat.type";
import dayjs from "dayjs";
import Image from "next/image";

type ChatMessageItemProps = {
  message: TChatWithUser;
  showNickname: boolean;
  showTime: boolean;
};

function ChatMessageItem({ message, showNickname, showTime }: ChatMessageItemProps) {
  const { user } = useUserContext();
  const isCurrentUser = user?.userId === message.user_id;

  const getDisplayNickname = (nickname: string | undefined) => {
    if (!nickname) return "";
    return nickname.length > 12 ? `${nickname.slice(0, 12)}...` : nickname;
  };

  const formatTime = (time: string) => {
    return dayjs(time).format("HH:mm");
  };
  return (
    <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} mb-2`}>
      {!isCurrentUser && showNickname && (
        <p className="leading-6 text-[#9500DC] mb-1">{getDisplayNickname(message.users?.nickname)}</p>
      )}
      <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} max-w-[70%]`}>
        {message.image_url && (
          <div className="flex items-end mb-2">
            {isCurrentUser && showTime && (
              <div className="text-xs text-gray-500 mr-2 whitespace-nowrap">{formatTime(message.created_at)}</div>
            )}
            <Image
              src={message.image_url}
              alt="chat image"
              width={200}
              height={200}
              className="rounded"
              objectFit="contain"
            />
            {!isCurrentUser && showTime && (
              <div className="text-xs text-gray-500 ml-2 whitespace-nowrap">{formatTime(message.created_at)}</div>
            )}
          </div>
        )}
        {message.content && (
          <div className="flex items-center mt-2">
            <div
              className={`px-5 py-2 flex items-center gap-2 ${
                isCurrentUser
                  ? "bg-main rounded-bl-[28px] rounded-br-[28px] rounded-tl-[28px]"
                  : "bg-[#EEE2FA] rounded-br-[28px] rounded-bl-[28px] rounded-tr-[28px]"
              } relative`}
            >
              <div className={`text-sm ${isCurrentUser ? "text-right" : "text-left"}`}>
                <p className="break-all">{message.content}</p>
              </div>
            </div>
            {showTime && (
              <div className={`text-xs text-gray-500 ${isCurrentUser ? "mr-2 order-first" : "ml-2"} whitespace-nowrap`}>
                {formatTime(message.created_at)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessageItem;
