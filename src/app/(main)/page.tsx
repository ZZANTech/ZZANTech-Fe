import LeftSection from "@/app/(main)/_components/LeftSection/LeftSection";
import RightSection from "@/app/(main)/_components/RightSection/RightSection";
import TopSection from "@/app/(main)/_components/TopSection/TopSection";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col sm:flex-row">
        <TopSection />
      </section>
      <div className="flex flex-col sm:flex-row ">
        <LeftSection />
        <RightSection />
      </div>
    </main>
  );
}
