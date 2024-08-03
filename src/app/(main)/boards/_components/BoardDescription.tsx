import { ReactNode } from "react";

type BoardDescriptionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function BoardDescription({ title, description, children }: BoardDescriptionProps) {
  return (
    <section className="h-[120px] px-[30px] py-[29px] flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="flex-col justify-start items-start gap-3.5 flex">
        <h1 className="self-stretch h-[29px] text-black text-2xl font-semibold">{title}</h1>
        <p className="w-[495px] text-black text-base font-normal">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default BoardDescription;
