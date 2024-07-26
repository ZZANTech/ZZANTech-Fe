import Image from "next/image";
import QuizUi from "./_components/QuizUi";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col lg:flex-row gap-14">
        <Image src="/home/home_banner.png" alt="home banner" layout="responsive" width={700} height={250} />
        <QuizUi />
      </section>
    </main>
  );
}
