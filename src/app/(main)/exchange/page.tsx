import { getGifts } from "@/apis/exchange";
import ExchangeContainer from "@/app/(main)/exchange/_components/ExchangeContainer";
import { HydrationBoundary, QueryClient, dehydrate, queryOptions } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZZAN | 포인트샵",
  description:
    "모은 포인트로 다양한 기프티콘을 교환해 보세요! 포인트를 활용해 즐거운 소비를 경험할 수 있는 곳입니다. 함께 스마트한 소비를 실현해봐요!"
};

async function ExchangePage() {
  const queryClient = new QueryClient({});

  const giftsOptions = queryOptions({
    queryKey: ["gifts"],
    queryFn: getGifts
  });

  await queryClient.prefetchQuery(giftsOptions);

  return (
    <div className="w-full h-full mt-24">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExchangeContainer />
      </HydrationBoundary>
    </div>
  );
}

export default ExchangePage;
