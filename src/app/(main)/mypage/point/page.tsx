import MyCurrentPoints from "@/app/(main)/mypage/_components/Points/MyCurrentPoints";
import MyPointsHistoryTable from "@/app/(main)/mypage/_components/Points/MyPointsHistoryTable";

function MyPointDetailPage() {
  return (
    <section className="w-[800px] flex flex-col items-center justify-center mx-auto">
      <MyCurrentPoints />
      <MyPointsHistoryTable />
    </section>
  );
}

export default MyPointDetailPage;
