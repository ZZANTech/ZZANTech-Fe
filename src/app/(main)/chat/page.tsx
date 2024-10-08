import { defaultOpenGraph } from "@/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "ZZAN | 살까말까 LIVE",
  description:
    "살까 말까 고민되는 상품을 올리면 실시간으로 고민을 해결해주는 라이브 채팅방입니다! 우리 다같이 똑똑한 소비자가 되어 보자구",
  openGraph: {
    ...defaultOpenGraph,
    title: "ZZAN - 살까말까 LIVE",
    url: "https://zzan-tech.com/chat",
    description: "이 물건 살까 말까? 고민된다면 실시간 라이브 채팅방에서 다른 사람들과 함께 현명한 결정을 내려보세요!"
  }
};

function ChatPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[calc(100dvh-400px)] lg:mt-24">
      <div className="relative flex flex-col lg:flex-row lg:justify-center lg:items-center">
        <section className="flex flex-col items-start mr-28 w-full lg:w-auto">
          <h4 className="bg-main text-2xl lg:text-3xl font-semibold rounded-md px-2">살까? 말까? 고민될 때는</h4>
          <h4 className="bg-main text-2xl lg:text-3xl font-semibold rounded-md px-2 mb-6">LIVE 채팅방에 물어봐!</h4>
          <p>살까? 말까? 장바구니 고민, 즉석에서 해결해 드려요!</p>
          <p className="w-full mb-7">짠테커들아 우리 다같이 똑똑한 소비자가 되어 보자구 🔎</p>
          <Link href="/chat/1" className="absolute bottom-0 left-5 lg:relative">
            <div className="flex">
              <Image src="icons/chat/join.svg" alt="join" width={40} height={40} className="mr-4" priority />
              <button className="text-xl">입장하기</button>
            </div>
          </Link>
        </section>
        <section className="w-full flex pr-5 justify-end lg:w-auto lg:pr-0">
          <Image
            src="logos/tigglemoaAirplane.svg"
            alt="airplane"
            width={100}
            height={50}
            className="w-[140px] h-[105px] lg:w-[292px] lg:h-[220px]"
            priority
          />
        </section>
      </div>
      <div className="bg-ivory w-full max-w-[768px] p-5 mt-8 mx-auto rounded-md border">
        <strong className="text-info-red text-xl pl-2">주의 사항</strong>
        <p className="text-gray-900 mt-3">• 개인정보를 함부로 유출하지 않도록 주의해야 합니다.</p>
        <p className="lg:block hidden">• 비방 및 욕설 금지: 다른 사용자를 비방하거나 욕설하는 행위는 금지됩니다.</p>
        <p className="lg:hidden">• 비방 및 욕설 금지: 다른 사용자를 비방하거나</p>
        <p className="lg:hidden indent-3">행위는 금지됩니다.</p>
      </div>
    </div>
  );
}

export default ChatPage;
