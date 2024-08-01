import LeftSection from "@/app/(main)/_components/LeftSection/LeftSection";
import RightSection from "@/app/(main)/_components/RightSection/RightSection";
import TopSection from "@/app/(main)/_components/TopSection/TopSection";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col lg:flex-row">
        <TopSection />
      </section>
      <div className="flex flex-col lg:flex-row gap-14">
        <div className="w-full lg:max-w-[700px] lg:w-[700px]">
          <LeftSection />
        </div>
        <div className="w-full flex-1">
          <RightSection />
        </div>
      </div>
    </main>
  );
}
