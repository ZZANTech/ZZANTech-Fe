"use client";

import { useChatRoomsQuery } from "@/stores/queries/useChatRoomsQuery";
import Link from "next/link";

function ChatRoomList() {
  const { data: chatRooms } = useChatRoomsQuery();

  return (
    <div>
      {chatRooms?.length ? (
        <ul>
          {chatRooms.map((room) => (
            <li key={room.roomId}>
              <Link href={`/chat/${room.roomId}`}>{room.room_name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>채팅방이 없습니다.</p>
      )}
      <button>입장하기</button>
    </div>
  );
}

export default ChatRoomList;
