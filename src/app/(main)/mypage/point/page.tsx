import MobileHeader from "@/components/MobileHeader";
import MyCurrentPoints from "@/app/(main)/mypage/_components/Points/MyCurrentPoints";
import MyPointsHistoryTable from "@/app/(main)/mypage/_components/Points/MyPointsHistoryTable";

function MyPointDetailPage() {
  return (
    <>
      <MobileHeader title="사용 내역" />
      <section className="max-w-[760px] flex flex-col items-center justify-center mx-auto">
        <MyCurrentPoints />
        <MyPointsHistoryTable />
      </section>
    </>
  );
}

export default MyPointDetailPage;
