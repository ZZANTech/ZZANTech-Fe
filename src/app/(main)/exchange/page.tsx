import { getGifts } from "@/apis/exchange";
import ExchangeContainer from "@/app/(main)/exchange/_components/ExchangeContainer";
import GiftContainer from "@/app/(main)/exchange/_components/GiftContainer";
import FilterOption from "@/app/(main)/mypage/posts/_components/FilterOption";
import { HydrationBoundary, QueryClient, dehydrate, queryOptions } from "@tanstack/react-query";

async function ExchangePage() {
  const queryClient = new QueryClient({});

  const giftsOptions = queryOptions({
    queryKey: ["gifts"],
    queryFn: getGifts
  });

  await queryClient.prefetchQuery(giftsOptions);

  return (
    <div className="w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExchangeContainer />
      </HydrationBoundary>
    </div>
  );
}

export default ExchangePage;
