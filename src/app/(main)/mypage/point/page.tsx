import MyCurrentPoints from "@/app/(main)/mypage/_components/Points/MyCurrentPoints";
import MyPointsHistoryTable from "@/app/(main)/mypage/_components/Points/MyPointsHistoryTable";

function MyPointDetailPage() {
  return (
    <section className="w-[933.08px] flex flex-col items-center justify-center gap-16 mx-auto">
      <MyCurrentPoints />
      <MyPointsHistoryTable />
    </section>
  );
}

export default MyPointDetailPage;
