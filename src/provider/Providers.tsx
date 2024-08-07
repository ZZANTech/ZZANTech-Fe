import { ModalProvider } from "@/provider/contexts/ModalContext";
import UserProvider from "@/provider/contexts/UserContext";
import QueryProvider from "@/provider/QueryProvider";
import SupabaseProvider from "@/provider/SupabaseProvider";

import { ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <UserProvider>
        <SupabaseProvider>
          <ModalProvider>{children} </ModalProvider>
        </SupabaseProvider>
      </UserProvider>
    </QueryProvider>
  );
}

export default Providers;
