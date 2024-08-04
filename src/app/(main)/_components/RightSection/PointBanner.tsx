import Image from "next/image";
import Link from "next/link";

function PointBanner() {
  return (
    <div className="bg-gray-200 py-9 px-[26px] rounded-xl ">
      <section className="flex">
        <div className="flex flex-col mr-9 mb-16">
          <strong className="mb-2 text-point text-xl">포인트로 뭘 살 수 있을까?</strong>
          <p>#포인트샵 #기프티콘 #구경가자</p>
        </div>
        <div className="mt-6 transform transition-transform hover:scale-105">
          <Link href="/exchange">
            <Image src="/home/arrow.png" alt="arrow" width={40} height={20} />
          </Link>
        </div>
      </section>
      <section>
        <Image src="/home/giftIcon.png" alt="giftIcon" width={306} height={90} />
      </section>
    </div>
  );
}

export default PointBanner;
