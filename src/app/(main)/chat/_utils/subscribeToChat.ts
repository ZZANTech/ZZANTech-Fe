// import { createClient } from "@/utils/supabase/client";

// export const subscribeToChat = (handleInserts: (payload: any) => void, id: string) => () => {
//   const channel = createClient()
//     .channel(`chat_${id}`)
//     .on(
//       "postgres_changes",
//       {
//         event: "INSERT",
//         schema: "public",
//         table: "chats",
//         filter: `room_id=eq.${id}`
//       },
//       handleInserts
//     )
//     .subscribe();

//   return () => {
//     channel.unsubscribe();
//   };
// };
