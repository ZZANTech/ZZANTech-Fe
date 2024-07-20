import { ReactNode } from "react";

type BoardsPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function BoardsPage({ title, description, children }: BoardsPageProps) {
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

export default BoardsPage;
