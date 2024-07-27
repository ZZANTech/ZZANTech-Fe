import { ReactNode } from "react";
import HeaderContainer from "./_components/HeaderContainer";

type Props = { children: ReactNode; modal: ReactNode };
export default function Layout({ children, modal }: Props) {
  return (
    <div className="flex flex-col min-h-dvh">
      <HeaderContainer />
      <main className="flex-grow w-full max-w-[1120px] mx-auto">{children}</main>
      {modal}
    </div>
  );
}
