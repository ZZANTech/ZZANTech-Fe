import { ModalProvider } from "@/provider/contexts/ModalContext";
import UserProvider from "@/provider/contexts/UserContext";
import QueryProvider from "@/provider/queryProvider";
import { ReactNode } from "react";

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
