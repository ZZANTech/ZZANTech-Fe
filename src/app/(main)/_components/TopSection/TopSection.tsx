import QuizUi from "@/app/(main)/_components/QuizUi";
import Image from "next/image";
import Link from "next/link";

function TopSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-14 mx-auto max-w-[1120px]">
      <div className="flex-shrink-0 lg:w-[700px] w-full">
        <Link href="/exchange">
          <Image src="/home/home_banner.png" alt="home banner" width={700} height={250} className="w-full h-auto" />
        </Link>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <QuizUi />
      </div>
    </section>
  );
}

export default TopSection;
