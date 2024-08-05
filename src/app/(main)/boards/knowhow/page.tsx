import BoardDescription from "@/app/(main)/boards/_components/BoardDescription";
import KnowhowContainer from "@/app/(main)/boards/knowhow/_components/KnowhowContainer";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ZZAN | 짠 노하우",
  description: "특가 상품, 절약 노하우, 재테크 방법 등 다양한 짠-노하우를 공유해 보세요!"
};

function KnowhowPage() {
  return (
    <BoardDescription
      title="짠 노하우를 공유해요!"
      description="특가 상품, 절약 노하우, 재테크 방법 짠-노하우를 공유해 보세요."
    >
      <Suspense>
        <KnowhowContainer />
      </Suspense>
    </BoardDescription>
  );
}

export default KnowhowPage;
