import LiveChattingBanner from "@/app/(main)/_components/LeftSection/LiveChattingBanner";
import TopKnowhows from "@/app/(main)/_components/LeftSection/TopKnowhows";
import TopVotes from "@/app/(main)/_components/LeftSection/TopVotes";
import PointRankingContainer from "@/app/(main)/_components/RightSection/PointRankingContainer";

function LeftSection() {
  return (
    <div className="flex flex-col">
      <section>
        <TopVotes />
      </section>
      <section className="mt-8 lg:hidden">
        <PointRankingContainer />
      </section>
      <section>
        <LiveChattingBanner />
      </section>
      <section className="mt-[55px]">
        <TopKnowhows />
      </section>
    </div>
  );
}

export default LeftSection;
