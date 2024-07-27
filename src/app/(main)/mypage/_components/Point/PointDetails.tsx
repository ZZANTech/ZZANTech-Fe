import Image from "next/image";

const PointDetails = () => {
  return (
    <div className="flex flex-row gap-5">
      <div>
        <p className="text-lg font-bold">현재 포인트</p>
        <div className="flex flex-row gap-2.5">
          <Image src={"/icons/fire.png"} width={24} height={24} alt="" />
          <p className="text-xl font-bold">1,000 점</p>
        </div>
      </div>

      <div>
        <p className="text-lg font-bold">현재 포인트</p>
        <div className="flex flex-row gap-2.5">
          <p className="text-xl font-bold">1,000 점</p>
        </div>
      </div>
    </div>
  );
};

export default PointDetails;
