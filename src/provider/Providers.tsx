import { ModalProvider } from "@/provider/contexts/modalContext";
import QueryProvider from "@/provider/queryProvider";
import { ReactNode } from "react";
import UserProvider from "./contexts/userContext";

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
