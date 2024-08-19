import Image from "next/image";
import eyes from "/public/loading_eyes.gif";
import clsx from "clsx";

type LoadingSpinnerProps = {
  isSubmitting?: boolean;
};

function LoadingEyes({ isSubmitting }: LoadingSpinnerProps) {
  return (
    <div
      className={clsx("fixed inset-0 z-50  flex items-center justify-center", {
        "bg-black bg-opacity-20 pointer-events-auto select-none": isSubmitting,
        "pointer-events-none bg-white": !isSubmitting
      })}
    >
      <div className="flex flex-col gap-4 items-center">
        <Image src={eyes} alt="로딩눈알" width={116} height={116} />
        <span className="text-center text-point text-4xl leading-[52px] font-bold">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingEyes;
{
}
