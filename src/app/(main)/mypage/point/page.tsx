import MyCurrentPoints from "@/app/(main)/mypage/_components/Points/MyCurrentPoints";
import MyPointsHistoryTable from "@/app/(main)/mypage/_components/Points/MyPointsHistoryTable";

function MyPointDetailPage() {
  return (
    <section>
      <h3>나의 포인트</h3>
      <MyCurrentPoints />
      <MyPointsHistoryTable />
    </section>
  );
}

export default MyPointDetailPage;
