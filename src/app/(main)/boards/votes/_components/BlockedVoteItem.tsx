import Image from "next/image";
import sadTikkle from "/public/blocked/sad_tikkle.png";

function BlockedVoteItem() {
  return (
    <div className="w-full h-full gap-4 justify-center items-center flex flex-col bg-ivory">
      <Image src={sadTikkle} alt="슬퍼하는 티끌이" width={61} height={70} />
      <div className="text-gray-900 text-center text-sm font-semibold">
        <p>관리자에 의해</p>
        <p>규제된 게시글입니다</p>
      </div>
    </div>
  );
}

export default BlockedVoteItem;
