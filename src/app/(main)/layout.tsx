import HeaderContainer from "@/app/(main)/_components/HeaderContainer";
import { ReactNode } from "react";

type Props = { children: ReactNode; modal: ReactNode };
export default function Layout({ children, modal }: Props) {
  return (
    <div className="flex flex-col min-h-dvh">
      <HeaderContainer />
      <main className="flex-grow w-full max-w-[1120px] mx-auto px-4">{children}</main>
      {modal}
    </div>
  );
}
