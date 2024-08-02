import MyCurrentPoints from "@/app/(main)/mypage/_components/Points/MyCurrentPoints";
import MyPointsHistoryTable from "@/app/(main)/mypage/_components/Points/MyPointsHistoryTable";
import { Suspense } from "react";

function MyPointDetailPage() {
  return (
    <section className="w-[933.08px] flex flex-col items-center justify-center gap-16 mx-auto">
      <MyCurrentPoints />
      <Suspense>
        <MyPointsHistoryTable />
      </Suspense>
    </section>
  );
}

export default MyPointDetailPage;
