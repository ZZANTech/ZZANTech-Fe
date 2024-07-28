import { ReactNode } from "react";

function EditorLayout({ children }: { children: ReactNode }) {
  return <main className="px-[98px]">{children}</main>;
}

export default EditorLayout;
