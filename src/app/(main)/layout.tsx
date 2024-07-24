import { ReactNode } from "react";
import HeaderContainer from "./_components/HeaderContainer";

type Props = { children: ReactNode; modal: ReactNode };
export default function Layout({ children, modal }: Props) {
  return (
    <div>
      <HeaderContainer />
      {children}
      {modal}
    </div>
  );
}
