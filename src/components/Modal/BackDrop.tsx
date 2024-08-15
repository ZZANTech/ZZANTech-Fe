import { ReactNode } from "react";

function BackDrop({ children }: { children: ReactNode }) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/60 flex items-center justify-center z-40">
      {children}
    </div>
  );
}

export default BackDrop;
