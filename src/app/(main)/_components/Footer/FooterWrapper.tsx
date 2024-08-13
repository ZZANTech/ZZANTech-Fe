import { ReactNode } from "react";

function FooterWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full border-t border-gray-50 mt-20">
      <div className="max-w-[1120px] mx-auto px-5 lg:px-0">{children}</div>
    </div>
  );
}

export default FooterWrapper;
