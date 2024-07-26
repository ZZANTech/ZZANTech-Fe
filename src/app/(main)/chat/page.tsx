import React from "react";
import ChatRoomList from "./_components/ChatRoomList";

function ChatPage() {
  return (
    <div>
      <h2>살까 말까? LIVE</h2>
      <p>
        살까 말까 고민되는 상품을 올리면 실시간으로 고민을 해결해주는 라이브 채팅방입니다! 우리 다같이 똑똑한 소비자가
        되어 보자구 🔎
      </p>
      <section className="w-[40dvw] h-[40dvh] flex flex-col items-center justify-center my-auto mx-auto bg-slate-500">
        <ChatRoomList />
      </section>
    </div>
  );
}

export default ChatPage;
