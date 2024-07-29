import TopKnowhows from "@/app/(main)/_components/LeftSection/TopKnowhows";
import TopVotes from "@/app/(main)/_components/LeftSection/TopVotes";

function LeftSection() {
  return (
    <section className="flex flex-col gap-14">
      <TopVotes />
      <TopKnowhows />
    </section>
  );
}

export default LeftSection;
