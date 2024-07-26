import QueryProvider from "@/provider/QueryProvider";
import { ModalProvider } from "@/provider/contexts/ModalContext";
import UserProvider from "@/provider/contexts/UserContext";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <SessionContextProvider>
        <UserProvider>
          <ModalProvider>{children}</ModalProvider>
        </UserProvider>
      </SessionContextProvider>
    </QueryProvider>
  );
}

export default Providers;
