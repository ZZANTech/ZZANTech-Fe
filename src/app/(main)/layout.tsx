import { ReactNode } from "react";

type Props = { children: ReactNode; QuizModal: ReactNode; GradeModal: ReactNode };
export default function Layout({ children, QuizModal, GradeModal }: Props) {
  return (
    <>
      {children}
      {QuizModal}
      {GradeModal}
    </>
  );
}
