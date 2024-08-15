import Button from "@/components/Button";
import Image from "next/image";

function PointBanner() {
  return (
    <div className="relative bg-ivory rounded-xl lg:h-[280px]">
      <div className="z-10">
        <div className="flex flex-col p-4 lg:pt-9 lg:pl-6">
          <strong className="text-point text-xl">포인트로 뭘 살 수 있을까?</strong>
          <p className="mb-3 lg:mb-5">#포인트샵 #기프티콘 #구경가자</p>
          <Button href="/exchange" className="py-2 rounded-[100px]">
            포인트샵가기
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 right-0">
        <Image
          src="/home/pointEye.png"
          alt="giftIcon"
          width={150}
          height={150}
          className="w-[110px] h-[80px] lg:w-[215px] lg:h-[145px]"
        />
      </div>
    </div>
  );
}

export default PointBanner;
