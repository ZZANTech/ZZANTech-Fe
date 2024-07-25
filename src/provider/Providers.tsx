import { ModalProvider } from "@/provider/contexts/modalContext";
import { ReactNode } from "react";
import UserProvider from "./contexts/userContext";
import QueryProvider from "./QueryProvider";

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
