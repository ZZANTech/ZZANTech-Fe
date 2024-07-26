import { ReactNode } from "react";

type BoardDescriptionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function BoardDescription({ title, description, children }: BoardDescriptionProps) {
  return (
    <main>
      <section>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      {children}
    </main>
  );
}

export default BoardDescription;
