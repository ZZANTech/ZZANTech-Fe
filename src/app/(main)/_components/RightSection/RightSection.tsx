import Magazine from "@/app/(main)/_components/RightSection/Magazine";
import PointBanner from "@/app/(main)/_components/RightSection/PointBanner";
import PointRankingContainer from "@/app/(main)/_components/RightSection/PointRankingContainer";

function RightSection() {
  return (
    <div>
      <section className="mb-11 lg:block hidden">
        <PointRankingContainer />
      </section>
      <section className="mb-12">
        <PointBanner />
      </section>
      <section>
        <Magazine />
      </section>
    </div>
  );
}

export default RightSection;
