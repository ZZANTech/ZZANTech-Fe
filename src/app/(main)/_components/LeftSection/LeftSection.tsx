import LiveChattingBanner from "@/app/(main)/_components/LeftSection/LiveChattingBanner";
import TopKnowhows from "@/app/(main)/_components/LeftSection/TopKnowhows";
import TopVotes from "@/app/(main)/_components/LeftSection/TopVotes";

function LeftSection() {
  return (
    <section className="flex flex-col">
      <TopVotes />
      <LiveChattingBanner />
      <TopKnowhows />
    </section>
  );
}

export default LeftSection;
