import { ReactNode } from "react";

type BoardDescriptionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function BoardDescription({ title, description, children }: BoardDescriptionProps) {
  return (
    <main className="mx-9">
      <section className="flex w-full flex-col gap-3.5  mb-[42px] mt-[69px]">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="">{description}</p>
      </section>
      {children}
    </main>
  );
}

export default BoardDescription;
