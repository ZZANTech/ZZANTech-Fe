import { getGifts } from "@/apis/exchange";
import ExchangeContainer from "@/app/(main)/exchange/_components/ExchangeContainer";

async function ExchangePage() {
  const gifts = await getGifts();

  return <ExchangeContainer gifts={gifts} />;
}

export default ExchangePage;
