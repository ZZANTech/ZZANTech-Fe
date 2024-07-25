import { ReactNode } from "react";
import HeaderContainer from "./_components/HeaderContainer";

type Props = { children: ReactNode; modal: ReactNode };
export default function Layout({ children, modal }: Props) {
  return (
    <div className="w-full max-w-[1120px] mx-auto">
      <HeaderContainer />
      {children}
      {modal}
    </div>
  );
}
