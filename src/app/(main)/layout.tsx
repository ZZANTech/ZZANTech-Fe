import { ReactNode } from "react";

type Props = { children: ReactNode; QuizModal: ReactNode };
export default function Layout({ children, QuizModal }: Props) {
  return (
    <>
      {children}
      {QuizModal}
    </>
  );
}
