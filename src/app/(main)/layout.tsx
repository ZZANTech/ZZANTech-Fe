import HeaderContainer from "@/app/(main)/_components/HeaderContainer";
import { ReactNode } from "react";

type Props = { children: ReactNode; modal: ReactNode };
export default function Layout({ children, modal }: Props) {
  return (
    <div className="flex flex-col w-full min-h-dvh">
      {/* <HeaderContainer /> */}
      <main className="flex-grow w-full max-w-[1120px] mx-auto">{children}</main>
      {modal}
    </div>
  );
}
