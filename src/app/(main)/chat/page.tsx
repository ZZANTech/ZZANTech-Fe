import { Metadata } from "next";
import ChatRoomList from "./_components/ChatRoomList";

export const metadata: Metadata = {
  title: "ZZAN | 살까말까 LIVE",
  description:
    "살까 말까 고민되는 상품을 올리면 실시간으로 고민을 해결해주는 라이브 채팅방입니다! 우리 다같이 똑똑한 소비자가 되어 보자구"
};

function ChatPage() {
  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-2xl mb-5">살까 말까? LIVE</h2>
      <p className="text-xl">살까 말까 고민되는 상품을 올리면 실시간으로 고민을 해결해주는 라이브 채팅방입니다!</p>
      <p className="text-xl mb-8">우리 다같이 똑똑한 소비자가 되어 보자구 🔎</p>
      <ChatRoomList />
      <div className="bg-ivory max-w-[660px] p-5 mt-8 mx-auto rounded-md border">
        <strong className="text-info-red text-xl pl-2">주의 사항</strong>
        <p className="text-gray-900 mt-3">
          • 개인정보를 함부로 유출하지 않도록 주의해야 합니다.
          <br />• 비방 및 욕설 금지: 다른 사용자를 비방하거나 욕설하는 행위는 금지됩니다.
        </p>
      </div>
    </div>
  );
}

export default ChatPage;
