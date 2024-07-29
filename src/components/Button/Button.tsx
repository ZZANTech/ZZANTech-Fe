"use client";
import Link from "next/link";
import { ComponentProps, MouseEventHandler, ReactNode } from "react";

type ButtonProps = CustomButtonProps & {
  bgColor?: "black" | "white" | "main";
  disabled?: boolean;
  children: ReactNode;
};

type CustomButtonProps =
  | ({ href?: undefined } & ComponentProps<"button">)
  | ({ href: string } & ComponentProps<typeof Link>);

function Button({ children, bgColor, disabled, className = "", ...props }: ButtonProps) {
  const bgBlack = "bg-black text-white border-none";
  const bgWhite = "bg-white text-black border border-[#111111]";
  const bgMain = "bg-main text-black border-none";

  const getColorClass = (bgColor?: "black" | "white" | "main") => {
    switch (bgColor) {
      case "black":
        return bgBlack;
      case "white":
        return bgWhite;
      case "main":
        return bgMain;
      default:
        return bgBlack;
    }
  };
  const color = getColorClass(bgColor);

  const buttonBaseStyle = `flex justify-center items-center w-40 h-[52px] px-4 py-3 font-semibold border rounded-lg `;
  const combinedClassName = `${buttonBaseStyle} ${color} ${className}`;
  const disableClassName = `${buttonBaseStyle} ${className} !bg-[#f1f1f5] !text-[#999999] cursor-default`;
  const finalClassName = disabled ? disableClassName : combinedClassName;

  if (props.href) {
    if (disabled) {
      return (
        <span className={finalClassName} onClick={(e) => e.preventDefault()}>
          {children}
        </span>
      );
    }
    return (
      <Link className={finalClassName} {...props}>
        {children}
      </Link>
    );
  } else if (typeof props.href === "undefined") {
    return (
      <button className={finalClassName} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
}

export default Button;
