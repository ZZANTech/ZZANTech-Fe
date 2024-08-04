"use client";

import { useChatRoomsQuery } from "@/stores/queries/useChatRoomsQuery";
import Image from "next/image";
import Link from "next/link";

function ChatRoomList() {
  const { data: chatRooms } = useChatRoomsQuery();

  return (
    <div>
      {chatRooms?.map((room) => (
        <section
          key={room.roomId}
          className="w-full h-full max-w-[660px] max-h-[600px] mx-auto flex flex-col items-center justify-center bg-gray-50 rounded-[40px] py-8 shadow-lg"
        >
          <div className="mb-4">
            <Image src="/icons/speech_bubble_chat.png" width={200} height={200} alt="채팅 아이콘" />
          </div>
          <div className="mb-4">
            <h2 className="text-3xl text-center font-bold mb-4">{room.room_name}</h2>
          </div>
          <Link href={`/chat/${room.roomId}`}>
            <button className="bg-main font-bold text text-black px-4 py-2 rounded-lg">라이브 채팅방 입장하기</button>
          </Link>
        </section>
      ))}
    </div>
  );
}

export default ChatRoomList;
