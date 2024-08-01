import QuizUi from "@/app/(main)/_components/QuizUi";
import Image from "next/image";

function TopSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-14 mx-auto">
      <div className="flex-grow lg:w-[700px] w-full">
        <Image
          src="/home/home_banner.png"
          alt="home banner"
          layout="responsive"
          width={700}
          height={250}
          className="w-full h-auto"
        />
      </div>
      <div className="flex-grow">
        <QuizUi />
      </div>
    </section>
  );
}

export default TopSection;
