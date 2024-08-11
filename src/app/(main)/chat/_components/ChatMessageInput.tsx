"use client";

import { useEffect, useState, useRef } from "react";
import { uploadImage, sendMessage } from "@/apis/chat";
import { useUserContext } from "@/provider/contexts/UserContext";
import Image from "next/image";

function ChatMessageInput({ roomId }: { roomId: number }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user } = useUserContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (isSubmitting || (!message.trim() && !image)) {
      return;
    }
    setIsSubmitting(true);

    let imageUrl: string | null = null;

    if (image) {
      try {
        const uploadResponse = await uploadImage(image, "chat_image");
        imageUrl = uploadResponse.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await sendMessage(roomId, message, imageUrl, user!.userId);
      setMessage("");
      setImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0] || null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [image]);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="flex">
          <label htmlFor="image-upload" className="cursor-pointer mr-2 mt-1">
            <Image src="/icons/picture.png" alt="이미지 업로드" width={40} height={40} />
            <input id="image-upload" type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          </label>
          <div className="relative">
            <div className="flex flex-col bg-white rounded-2xl">
              {previewUrl && (
                <div className="flex-shrink-0 mr-2">
                  <Image
                    src={previewUrl}
                    alt="이미지 미리보기"
                    width={50}
                    height={50}
                    className="rounded max-w-50 max-h-50 pl-3 pt-3"
                  />
                </div>
              )}
              <textarea
                value={message}
                ref={textareaRef}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={user ? "메시지를 입력하세요." : "로그인 후 메시지를 입력할 수 있습니다."}
                className="flex-grow rounded-2xl outline-none resize-none scrollbar-hide h-auto min-w-[558px] min-h-[44px] max-h-[200px] pt-2 pl-4  mt-1 pr-12 chatInputPlaceholder"
                rows={1}
                disabled={!user}
              />
              <button
                type="submit"
                disabled={isSubmitting || !user}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 w-9 h-9 bg-no-repeat bg-center bg-contain bg-[url('/icons/submit.svg')] hover:bg-[url('/icons/submit_hover.svg')]"
              >
                <span className="sr-only">전송</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ChatMessageInput;
