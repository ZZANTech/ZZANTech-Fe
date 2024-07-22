import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

type ButtonProps =
  | ({ href?: undefined } & ComponentProps<"button">)
  | (({ href: string } & ComponentProps<typeof Link>) & {
      children: ReactNode;
    });

export default function Button({ children, ...props }: ButtonProps) {
  const buttonBaseStyle = "px-4 py-2 border border-black";
  if (props.href) {
    return (
      <Link className={buttonBaseStyle} {...props}>
        {children}
      </Link>
    );
  } else if (typeof props.href === "undefined") {
    return (
      <button className={buttonBaseStyle} {...props}>
        {children}
      </button>
    );
  }
}
