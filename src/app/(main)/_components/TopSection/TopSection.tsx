import QuizUi from "@/app/(main)/_components/TopSection/QuizUi";
import Image from "next/image";
import Link from "next/link";

function TopSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-6 lg:gap-14">
      <div className="lg:w-[700px]">
        <Link href="/exchange">
          <Image src="/home/home_banner.png" alt="home banner" width={700} height={250} className="w-full" />
        </Link>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <QuizUi />
      </div>
    </section>
  );
}

export default TopSection;
