import { ModalProvider } from "@/provider/contexts/modalContext";
import QueryProvider from "@/provider/queryProvider";
import { ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ModalProvider>{children}</ModalProvider>
    </QueryProvider>
  );
}

export default Providers;
