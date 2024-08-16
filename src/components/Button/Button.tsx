import { ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import Link from "next/link";

type ButtonProps = VariantProps<typeof ButtonVariants> & {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  href?: string;
  onClick?: () => void;
};

const ButtonVariants = cva("flex justify-center items-center rounded", {
  variants: {
    variant: {
      white: "bg-white border border-gray-900 text-black",
      black: "bg-gray-900 text-white",
      trueBlack: "bg-black text-white",
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
      xl: "w-[212px] h-19 px-[55px] py-[26px] rounded-[12px]", // 212x76
      modalMedium: "w-[188px] h-[72px] py-3 px-5", // 188x72
      modalLarge: "w-[400px] h-[72px] py-3 px-5", // 400x72
      quizResponsive:
        "text-white lg:text-black bg-point lg:bg-white w-[116px] h-[32px] py-1 px-2 lg:w-80 lg:h-14 lg:p-4 lg:rounded-[8px] lg:text-lg"
    },
    textSize: {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg", //18px
      xl: "text-xl" //20px
    },
    weight: {
      light: "font-light", //300
      normal: "font-normal", //400
      semibold: "font-semibold", //600
      bold: "font-bold" //700
    },
    rounded: {
      medium: "rounded-[8px]"
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
    rounded: "medium",
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
  onClick,
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
    <button className={buttonClassName} disabled={disabled} type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
