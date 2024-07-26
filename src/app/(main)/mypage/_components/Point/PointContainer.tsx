import PointDetails from "@/app/(main)/mypage/_components/Point/PointDetails";
import PointGiftButton from "@/app/(main)/mypage/_components/Point/PointGiftButton";

function PointContainer() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <PointDetails />
        <PointGiftButton />
      </div>
      <p>포인트 3,000점이 넘으면 기프티콘으로 교환하실 수 있어요</p>
    </div>
  );
}

export default PointContainer;
