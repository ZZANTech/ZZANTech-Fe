import Introduction from "@/app/(main)/_components/RightSection/Introduction";
import PointBanner from "@/app/(main)/_components/RightSection/PointBanner";
import PointRankingContainer from "@/app/(main)/_components/RightSection/PointRankingContainer";

function RightSection() {
  return (
    <div>
      <section className="lg:mt-10 lg:block hidden">
        <PointRankingContainer />
      </section>
      <section className="lg:my-10 lg:block hidden">
        <PointBanner />
      </section>
      <section>
        <Introduction />
      </section>
    </div>
  );
}

export default RightSection;
