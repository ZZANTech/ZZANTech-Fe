import ChatRoomList from "./_components/ChatRoomList";
import Image from "next/image";

function ChatPage() {
  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-2xl mb-5">살까 말까? LIVE</h2>
      <p className="text-xl">살까 말까 고민되는 상품을 올리면 실시간으로 고민을 해결해주는 라이브 채팅방입니다!</p>
      <p className="text-xl mb-8">우리 다같이 똑똑한 소비자가 되어 보자구 🔎</p>
      <ChatRoomList />
    </div>
  );
}

export default ChatPage;
