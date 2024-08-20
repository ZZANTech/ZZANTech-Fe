import BoardDescription from "@/app/(main)/boards/_components/BoardDescription";
import DescriptionTagList from "@/app/(main)/boards/knowhow/_components/DescriptionTagList";
import KnowhowContainer from "@/app/(main)/boards/knowhow/_components/KnowhowContainer";
import KnowhowDescription from "@/app/(main)/boards/knowhow/_components/KnowhowDescription";
import { BASE_URL, defaultOpenGraph } from "@/constants";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ZZAN | 짠 노하우",
  description: "특가 상품, 절약 노하우, 재테크 방법 등 다양한 짠-노하우를 공유해 보세요!",
  openGraph: {
    ...defaultOpenGraph,
    title: "ZZAN - 짠 노하우",
    url: "https://zzan-tech.com/boards/knowhow",
    description:
      "생활 속에서 알뜰하게 실천할 수 있는 짠테크 노하우를 공유해 보세요! 작은 습관이 큰 절약으로 이어집니다."
  }
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
