import React, { ButtonHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
  children?: React.ReactNode;
  className?: string;
}

const ButtonVariants = cva("flex justify-center items-center rounded", {
  variants: {
    variant: {
      white: "bg-white border border-gray-900 text-black",
      black: "bg-gray-900 text-white",
      TrueBlack: "bg-black text-white",
      main: "bg-main text-black",
      yellow: "bg-info-yellow text-black",
      green: "bg-info-green text-black"
    },
    size: {
      small: "w-20 h-11 p-3", // 80x44
      medium: "w-31 h-11 px-4 py-3", // 124x44
      large: "w-80 h-14 p-4", // 320x56
      xl: "w-[212px] h-19 px-[55px] py-[26px]" // 212x76
    },
    textSize: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg"
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      semibold: "font-semibold",
      bold: "font-bold"
    },
    rounded: {
      small: "rounded-4",
      medium: "rounded-8"
    },
    fullWidth: {
      true: "w-full"
    }
  },
  defaultVariants: {
    variant: "black",
    size: "medium",
    weight: "normal",
    rounded: "small",
    fullWidth: false
  }
});

const Button = ({
  children,
  className,
  variant,
  size,
  textSize,
  weight,
  rounded,
  fullWidth,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(ButtonVariants({ variant, size, textSize, weight, rounded, fullWidth }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
