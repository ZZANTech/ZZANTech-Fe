import { ModalProvider } from "@/provider/contexts/ModalContext";
import { ReactNode } from "react";
import QueryProvider from "@/provider/queryProvider";
import UserProvider from "@/provider/contexts/UserContext";

function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <UserProvider>
        <ModalProvider>{children}</ModalProvider>
      </UserProvider>
    </QueryProvider>
  );
}

export default Providers;
