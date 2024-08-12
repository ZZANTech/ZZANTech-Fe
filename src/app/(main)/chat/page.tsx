import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ZZAN | 살까말까 LIVE",
  description:
    "살까 말까 고민되는 상품을 올리면 실시간으로 고민을 해결해주는 라이브 채팅방입니다! 우리 다같이 똑똑한 소비자가 되어 보자구"
};

function ChatPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[calc(100dvh-400px)]">
      <div className="flex justify-center items-center">
        <section className="flex flex-col items-start mr-28">
          <h4 className="bg-main text-3xl bord rounded-md px-2">살까? 말까? 고민될 때는</h4>
          <h4 className="bg-main text-3xl rounded-md px-2 mb-6">LIVE 채팅방에 물어봐!</h4>
          <p>살까? 말까? 장바구니 고민, 즉석에서 해결해 드려요!</p>
          <p className="mb-7">짠테커들아 우리 다같이 똑똑한 소비자가 되어 보자구 🔎</p>
          <Link href="/chat/1">
            <div className="flex">
              <Image src="icons/chat/join.svg" alt="join" width={40} height={40} className="mr-4" />
              <button className="text-xl">입장하기</button>
            </div>
          </Link>
        </section>
        <section>
          <Image src="logos/tigglemoaAirplane.svg" alt="airplane" width={292} height={220} />
        </section>
      </div>
      <div className="bg-ivory w-full max-w-[768px] p-5 mt-8 mx-auto rounded-md border">
        <strong className="text-info-red text-xl pl-2">주의 사항</strong>
        <p className="text-gray-900 mt-3">
          • 개인정보를 함부로 유출하지 않도록 주의해야 합니다.
          <br />• 비방 및 욕설 금지: 다른 사용자를 비방하거나 욕설하는 행위는 금지됩니다.
        </p>
      </div>
    </div>
  );
}

export default ChatPage;
