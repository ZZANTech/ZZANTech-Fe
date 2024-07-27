import { BASE_URL } from "@/constants";
import { TUploadResponse, TMessageResponse, TChatWithUser } from "@/types/chat.type";

export const fetchChatRooms = async () => {
  const response = await fetch(`${BASE_URL}/api/chat_rooms`);
  if (!response.ok) {
    throw new Error("채팅방 목록을 가져오는데 실패했습니다.");
  }
  return response.json();
};

export const uploadImage = async (file: File, bucketName: string): Promise<TUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", bucketName);

  const response = await fetch(`${BASE_URL}/api/image/upload`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "이미지 업로드에 실패했습니다.");
  }
  return response.json();
};

export const fetchInitialChats = async (roomId: number): Promise<TChatWithUser[]> => {
  const response = await fetch(`/api/chat?roomId=${roomId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch initial chats.");
  }

  const data = await response.json();
  return data;
};

export const sendMessage = async (
  room_id: number,
  content: string | null,
  image_url: string | null,
  user_id: string
): Promise<TMessageResponse> => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ room_id, content, image_url, user_id })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "메시지 전송에 실패했습니다.");
  }
  return response.json();
};
