import QuizUi from "@/app/(main)/_components/TopSection/QuizUi";
import TopBanner from "@/app/(main)/_components/TopSection/TopBanner";

function TopSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-6 lg:gap-14">
      <TopBanner />
      <div className="flex-grow flex items-center justify-center lg:justify-end">
        <QuizUi />
      </div>
    </section>
  );
}

export default TopSection;
