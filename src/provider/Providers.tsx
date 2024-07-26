import QueryProvider from "@/provider/QueryProvider";
import SupabaseProvider from "@/provider/SupabaseProvider";
import { ModalProvider } from "@/provider/contexts/ModalContext";
import UserProvider from "@/provider/contexts/UserContext";
import { ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <SupabaseProvider>
        <UserProvider>
          <ModalProvider>{children}</ModalProvider>
        </UserProvider>
      </SupabaseProvider>
    </QueryProvider>
  );
}

export default Providers;
