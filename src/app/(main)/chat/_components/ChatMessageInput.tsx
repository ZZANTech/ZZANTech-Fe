"use client";

import { useState } from "react";
import { uploadImage, sendMessage } from "@/apis/chat";
import { useUserContext } from "@/provider/contexts/userContext";

function ChatMessageInput({ roomId }: { roomId: number }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { user } = useUserContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl: string | null = null;

    if (image) {
      try {
        const uploadResponse = await uploadImage(image, "chat_image");
        imageUrl = uploadResponse.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    try {
      await sendMessage(roomId, message, imageUrl, "b3a792f6-d450-49d6-ad82-307b2dd926af");
      setMessage("");
      setImage(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요."
      />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button type="submit">전송</button>
    </form>
  );
}

export default ChatMessageInput;
