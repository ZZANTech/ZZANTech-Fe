import { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
  className?: string;
};

function ErrorMessage({ children, className }: ErrorMessageProps) {
  return <span className={`block mt-2 text-info-red h-5  ${className || ""}`}>{children}</span>;
}

export default ErrorMessage;
