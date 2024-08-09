import { ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import Link from "next/link";

type ButtonProps = VariantProps<typeof ButtonVariants> & {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  href?: string; // href가 있으면 버튼이 링크로 동작
};

const ButtonVariants = cva("flex justify-center items-center rounded", {
  variants: {
    variant: {
      white: "bg-white border border-gray-900 text-black",
      black: "bg-gray-900 text-white",
      TrueBlack: "bg-black text-white",
      main: "bg-main text-black",
      yellow: "bg-info-yellow text-black",
      green: "bg-info-green text-black",
      orange: "bg-point text-white",
      kakaoyellow: "bg-[#FDE500] text-black"
    },
    size: {
      small: "w-20 h-11 p-3", // 80x44
      medium: "w-[124px] h-11 px-4 py-3", // 124x44
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
    },
    disabled: {
      true: "bg-gray-50 text-gray-400 cursor-default",
      false: ""
    }
  },
  defaultVariants: {
    variant: "black",
    size: "medium",
    weight: "normal",
    rounded: "small",
    fullWidth: false,
    disabled: false
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
  disabled = false,
  type = "button",
  href,
  ...props
}: ButtonProps) => {
  const buttonClassName = cn(
    ButtonVariants({ variant, size, textSize, weight, rounded, fullWidth, disabled }),
    className
  );
  // href가 있는 경우 Link로 렌더링
  if (href) {
    // 비활성화된 상태라면 span으로 대체하여 클릭을 막음
    if (disabled) {
      return (
        <span className={buttonClassName} onClick={(e) => e.preventDefault()}>
          {children}
        </span>
      );
    }

    // 활성화된 상태라면 Link 컴포넌트로 렌더링
    return (
      <Link href={href} className={buttonClassName} {...props}>
        {children}
      </Link>
    );
  }

  // href가 없으면 기본 button 요소로 렌더링
  return (
    <button className={buttonClassName} disabled={disabled} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
