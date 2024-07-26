import QueryProvider from "@/provider/QueryProvider";
import { ModalProvider } from "@/provider/contexts/ModalContext";
import UserProvider from "@/provider/contexts/UserContext";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      <QueryProvider>
        <UserProvider>{children}</UserProvider>
      </QueryProvider>
    </ModalProvider>
  );
}

export default Providers;
