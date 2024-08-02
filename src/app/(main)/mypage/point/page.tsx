import MyCurrentPoints from "@/app/(main)/mypage/_components/Points/MyCurrentPoints";
import MyPointsHistoryTable from "@/app/(main)/mypage/_components/Points/MyPointsHistoryTable";

function MyPointDetailPage() {
  return (
    <section className="w-[933.08px] h-[771px] flex-col items-center gap-16">
      <MyCurrentPoints />
      <MyPointsHistoryTable />
    </section>
  );
}

export default MyPointDetailPage;
