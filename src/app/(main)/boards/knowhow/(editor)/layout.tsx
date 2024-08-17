import MobileHeader from "@/components/MobileHeader";
import { ReactNode } from "react";

function EditorLayout({ children }: { children: ReactNode }) {
  return <main className="md:px-[98px]">{children}</main>;
}

export default EditorLayout;
