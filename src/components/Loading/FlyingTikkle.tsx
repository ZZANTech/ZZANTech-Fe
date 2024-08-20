import Image from "next/image";
import eyes from "/public/flying_tikkle.gif";
import clsx from "clsx";

type FlyingTikkleProps = {
  isSubmitting?: boolean;
};

function FlyingTikkle({ isSubmitting }: FlyingTikkleProps) {
  return (
    <div
      className={clsx("fixed inset-0 z-50  flex items-center justify-center", {
        "bg-black bg-opacity-20 pointer-events-auto select-none": isSubmitting,
        "pointer-events-none bg-white": !isSubmitting
      })}
    >
      <div className="flex flex-col  items-center">
        <Image src={eyes} className="bg-opacity-20" loading="eager" alt="플라잉티끌이" width={200} height={200} />
        <span className="text-center text-point text-2xl leading-[52px] font-bold">Loading...</span>
      </div>
    </div>
  );
}

export default FlyingTikkle;
{
}
