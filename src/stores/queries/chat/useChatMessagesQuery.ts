import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { fetchInitialChats } from "@/apis/chat";
import { TChatWithUser } from "@/types/chat.type";

export const useChatMessagesQuery = (roomId: number) => {
  return useInfiniteQuery<TChatWithUser[], Error>({
    queryKey: ["chats", roomId],
    queryFn: ({ pageParam = null }: { pageParam?: string | null }) => fetchInitialChats(roomId, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.length < 15) return undefined;
      return lastPage[lastPage.length - 1]?.created_at || null;
    },
    initialPageParam: null,
    select: (data: InfiniteData<TChatWithUser[]>) => {
      const reversedPages = data.pages
        .slice()
        .reverse()
        .map((page) => page.slice().reverse());
      return {
        ...data,
        pages: reversedPages
      };
    }
  });
};
