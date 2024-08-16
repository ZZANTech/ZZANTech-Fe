import BoardDescription from "@/app/(main)/boards/_components/BoardDescription";
import DescriptionTagList from "@/app/(main)/boards/knowhow/_components/DescriptionTagList";
import KnowhowContainer from "@/app/(main)/boards/knowhow/_components/KnowhowContainer";
import KnowhowDescription from "@/app/(main)/boards/knowhow/_components/KnowhowDescription";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ZZAN | 짠 노하우",
  description: "특가 상품, 절약 노하우, 재테크 방법 등 다양한 짠-노하우를 공유해 보세요!"
};

function KnowhowPage() {
  return (
    <>
      <KnowhowDescription />
      <Suspense>
        <KnowhowContainer />
      </Suspense>
    </>
  );
}

export default KnowhowPage;
